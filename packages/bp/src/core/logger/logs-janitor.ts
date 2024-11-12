import { Logger } from 'mlchain/sdk'
import { BotService } from 'core/bots'
import { MlchainConfig, ConfigProvider } from 'core/config'
import { Janitor } from 'core/services/janitor'
import { TYPES } from 'core/types'
import { inject, injectable, tagged } from 'inversify'
import _ from 'lodash'
import { Memoize } from 'lodash-decorators'
import moment from 'moment'
import ms from 'ms'

import { LogsRepository } from './logs-repository'

@injectable()
export class LogsJanitor extends Janitor {
  constructor(
    @inject(TYPES.Logger)
    @tagged('name', 'LogsJanitor')
    protected logger: Logger,
    @inject(TYPES.LogsRepository) private logsRepository: LogsRepository,
    @inject(TYPES.ConfigProvider) private configProvider: ConfigProvider,
    @inject(TYPES.BotService) private botService: BotService
  ) {
    super(logger)
  }

  @Memoize()
  private async getMlchainConfig(): Promise<MlchainConfig> {
    return this.configProvider.getMlchainConfig()
  }

  protected async getInterval(): Promise<string> {
    const config = await this.getMlchainConfig()
    return _.get(config, 'logs.dbOutput.janitorInterval', '30s')
  }

  async runTask(): Promise<void> {
    if (process.env.DEBUG_LOGGER) {
      this.logger.debug('Cleaning up logs')
    }

    const mlchainConfig = await this.getMlchainConfig()
    const botsConfigs = await this.botService.getBots()
    const botsIds = Array.from(botsConfigs.keys())
    const globalLogsExpiryTime = ms(_.get(mlchainConfig, 'logs.dbOutput.expiration', '2 weeks'))

    await Promise.mapSeries(botsIds, botId => {
      const botConfig = botsConfigs.get(botId)!
      const expiration = moment()
        .subtract(ms(_.get(botConfig, 'logs.expiration') || globalLogsExpiryTime))
        .toDate()
      return this.logsRepository.deleteBeforeDate(botId, expiration)
    })
  }
}
