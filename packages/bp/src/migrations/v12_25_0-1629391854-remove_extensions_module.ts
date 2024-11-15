import * as sdk from 'mlchain/sdk'
import { Migration, MigrationOpts } from 'core/migration'

const migration: Migration = {
  info: {
    description: 'Remove module extensions',
    target: 'core',
    type: 'config'
  },
  up: async ({ bp, configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()
    const entry = config.modules.find(x => x.location.endsWith('/extensions'))

    if (entry) {
      entry.enabled = false
      await configProvider.setMlchainConfig(config)
    }

    return { success: true, message: 'Configuration updated successfully' }
  }
}

export default migration
