import * as sdk from 'mlchain/sdk'
import { Migration } from 'core/migration'

const migration: Migration = {
  info: {
    description: 'Add no repeat policy in mlchain config',
    target: 'core',
    type: 'config'
  },
  up: async ({ configProvider }: sdk.ModuleMigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()
    if (config.noRepeatPolicy === undefined) {
      await configProvider.mergeMlchainConfig({ noRepeatPolicy: true })
      return { success: true, message: 'Configuration updated successfully' }
    } else {
      return { success: true, message: 'Field already exists, skipping...' }
    }
  }
}

export default migration
