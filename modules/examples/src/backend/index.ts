import * as sdk from 'mlchain/sdk'

const onServerStarted = async (bp: typeof sdk) => {}
const onServerReady = async (bp: typeof sdk) => {}

const botTemplates: sdk.BotTemplate[] = [{ id: 'weatherbot', name: 'Weather Bot', desc: 'Gets the weather for a city' }]

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  botTemplates,
  definition: {
    name: 'examples',
    noInterface: true,
    menuText: 'Examples',
    fullName: 'Examples',
    homepage: 'https://mlchain.com'
  }
}

export default entryPoint
