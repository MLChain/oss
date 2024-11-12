import * as sdk from 'mlchain/sdk'
import { Migration, MigrationOpts } from 'core/migration'

const migration: Migration = {
  info: {
    description: 'Adding actionServers configuration to Mlchain Config',
    target: 'core',
    type: 'config'
  },
  up: async ({ configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()
    if (config.actionServers) {
      return { success: true, message: 'Action Servers configuration already exists, skipping...' }
    }

    await configProvider.mergeMlchainConfig({
      actionServers: {
        local: {
          port: 4000,
          enabled: true
        },
        remotes: []
      }
    })
    return { success: true, message: 'Configuration updated successfully' }
  }
}

export default migration
