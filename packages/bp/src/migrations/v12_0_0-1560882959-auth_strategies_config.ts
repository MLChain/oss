import * as sdk from 'mlchain/sdk'
import { Migration, MigrationOpts } from 'core/migration'

const migration: Migration = {
  info: {
    description: 'Adds default strategy to Mlchain config & updates super admins',
    type: 'config'
  },
  up: async ({ configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()

    const hasAuthStrategy = config.authStrategies && Object.keys(config.authStrategies).length
    const hasCollabStrategy = config.pro.collaboratorsAuthStrategies && config.pro.collaboratorsAuthStrategies.length

    if (hasAuthStrategy && hasCollabStrategy) {
      return { success: true, message: 'Auth Strategies already configured, skipping...' }
    }

    await configProvider.mergeMlchainConfig({
      pro: {
        collaboratorsAuthStrategies: ['default']
      },
      authStrategies: {
        default: {
          type: 'basic',
          allowSelfSignup: false,
          options: {
            maxLoginAttempt: 0
          }
        }
      },
      // @ts-ignore Typing is off since the signature has changed
      superAdmins: config.superAdmins.map(email => ({ email, strategy: 'default' }))
    })

    return { success: true }
  }
}

export default migration
