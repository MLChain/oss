import * as sdk from 'mlchain/sdk'
import { ModuleConfigEntry } from 'core/config'
import { Migration, MigrationOpts } from 'core/migration'
import _ from 'lodash'

const CHANNELS = ['messenger', 'slack', 'smooch', 'teams', 'telegram', 'twilio', 'vonage'] as const
type Channels = typeof CHANNELS[number]

const migration: Migration = {
  info: {
    description: 'Remove channels from list of modules in mlchain config',
    target: 'core',
    type: 'config'
  },
  up: async ({ configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    const config = await configProvider.getMlchainConfig()
    const modules: ModuleConfigEntry[] = []

    for (const module of config.modules) {
      const { location, enabled } = module

      const channelName = location.replace('MODULES_ROOT/channel-', '')
      if (!CHANNELS.includes(channelName as Channels)) {
        modules.push({ location, enabled })
      }
    }

    config.modules = modules
    await configProvider.setMlchainConfig(config)

    return { success: true, message: 'Configuration updated successfully' }
  },
  down: async ({ bp, configProvider }: MigrationOpts): Promise<sdk.MigrationResult> => {
    // List channels that are enabled
    const channels: { [channelName: string]: boolean } = {}
    for (const bot of await bp.bots.getAllBots()) {
      const [, botConfig] = bot

      for (const channel of Object.entries(botConfig.messaging?.channels || {})) {
        const [channelName, channelConfig] = channel

        if (channels[channelName]) {
          continue
        }

        if (!(channelName in channels)) {
          channels[channelName] = false
        }

        channels[channelName] = channels[channelName] || (channelConfig.enabled as boolean)
      }
    }

    const config = await configProvider.getMlchainConfig()

    for (const channel of CHANNELS) {
      const location = `MODULES_ROOT/channel-${channel}`
      const enabled = channels[channel] || false

      config.modules.push({ location, enabled })
    }

    config.modules = _.sortBy(config.modules, m => m.location)
    await configProvider.setMlchainConfig(config)

    return { success: true, message: 'Configuration updated successfully' }
  }
}

export default migration
