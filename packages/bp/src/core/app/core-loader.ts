import 'bluebird-global'
import LicensingService from 'common/licensing-service'
import { GhostService } from 'core/bpfs'
import { ConfigProvider } from 'core/config'
import Database from 'core/database'
import { LoggerProvider } from 'core/logger'
import { LocalActionServer as LocalActionServerImpl } from 'core/user-code'
import { FatalError } from 'errors'
import 'reflect-metadata'

import { Mlchain as Core } from './mlchain'
import { container } from './inversify/app.inversify'
import { TYPES } from './types'

export interface MlchainApp {
  mlchain: Core
  logger: LoggerProvider
  config: ConfigProvider
  ghost: GhostService
  database: Database
  localActionServer: LocalActionServerImpl
}

let app: MlchainApp

export function createApp(): MlchainApp {
  if (app) {
    return app
  }

  try {
    app = {
      mlchain: container.get<Core>(TYPES.Mlchain),
      logger: container.get<LoggerProvider>(TYPES.LoggerProvider),
      config: container.get<ConfigProvider>(TYPES.ConfigProvider),
      ghost: container.get<GhostService>(TYPES.GhostService),
      database: container.get<Database>(TYPES.Database),
      localActionServer: container.get<LocalActionServerImpl>(TYPES.LocalActionServer)
    }

    const licensing = container.get<LicensingService>(TYPES.LicensingService)
    licensing.installProtection()

    return app
  } catch (err) {
    throw new FatalError(err, 'Error during initialization')
  }
}

export function createLoggerProvider(): LoggerProvider {
  return container.get<LoggerProvider>(TYPES.LoggerProvider)
}
