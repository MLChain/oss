import * as sdk from 'mlchain/sdk'
import { Migration, MigrationOpts } from 'core/migration'

const migration: Migration = {
  info: {
    description: 'Adding eventCollector configuration to Mlchain Config',
    type: 'config'
  },
  up: async ({ configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()
    if (config.eventCollector) {
      return { success: true, message: 'Event Collector configuration already exists, skipping...' }
    }

    await configProvider.mergeMlchainConfig({
      eventCollector: {
        enabled: true,
        collectionInterval: '5s',
        retentionPeriod: '30d',
        ignoredEventTypes: ['visit', 'typing']
      }
    })
    return { success: true, message: 'Configuration updated successfully' }
  }
}

export default migration
