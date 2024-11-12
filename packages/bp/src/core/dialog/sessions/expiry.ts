import { BotConfig } from 'mlchain/sdk'
import { MlchainConfig } from 'core/config'
import _ from 'lodash'
import moment from 'moment'
import ms from 'ms'

export interface DialogExpiry {
  context: Date
  session: Date
}

/**
 * Create expiry dates for dialog session and dialog context based on the bot configuration.
 * If no configuration is found for the bot, it will fallback to mlchain config.
 *
 * @param botConfig The bot configuration file i.e. bot.config.json
 * @param mlchainConfig Mlchain configuration file i.e. mlchain.config.json
 */
export function createExpiry(botConfig: BotConfig, mlchainConfig: MlchainConfig): DialogExpiry {
  const contextTimeout = ms(_.get(botConfig, 'dialog.timeoutInterval', mlchainConfig.dialog.timeoutInterval))
  const sessionTimeout = ms(
    _.get(botConfig, 'dialog.sessionTimeoutInterval', mlchainConfig.dialog.sessionTimeoutInterval)
  )

  return {
    context: moment()
      .add(contextTimeout, 'ms')
      .toDate(),
    session: moment()
      .add(sessionTimeout, 'ms')
      .toDate()
  }
}
