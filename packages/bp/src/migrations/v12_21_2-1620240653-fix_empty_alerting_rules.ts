import * as sdk from 'mlchain/sdk'
import { Migration, MigrationOpts } from 'core/migration'
import { isEmpty } from 'lodash'

const migration: Migration = {
  info: {
    description: 'Removes empty object in default alerting rules config',
    target: 'core',
    type: 'config'
  },
  up: async ({ configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()

    if (!config.pro.alerting.rules.length || !isEmpty(config.pro.alerting.rules[0])) {
      return { success: true, message: 'Skipping migration since alerting rules are already defined' }
    }

    config.pro.alerting.rules = []

    await configProvider.setMlchainConfig(config)

    return { success: true, message: 'Configuration updated successfully' }
  },
  down: async (): Promise<sdk.MigrationResult> => {
    return { success: true, message: 'Skipping migration...' }
  }
}

export default migration
