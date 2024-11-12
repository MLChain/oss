import * as sdk from 'mlchain/sdk'

const botTemplates: sdk.BotTemplate[] = [
  { id: 'proactive-bot', name: 'Proactive Bot', desc: 'The bot used to run the proactive interactive tutorials' }
]

const onServerStarted = async (bp: typeof sdk) => {}
const onServerReady = async (bp: typeof sdk) => {}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  botTemplates,
  definition: {
    name: 'proactive-module',
    menuText: 'Proactive Module',
    noInterface: true,
    fullName: 'Proactive Module',
    homepage: 'https://mlchain.com'
  }
}

export default entryPoint
