import * as sdk from 'mlchain/sdk'

import en from '../translations/en.json'
import es from '../translations/es.json'
import fr from '../translations/fr.json'

const botTemplates: sdk.BotTemplate[] = [
  { id: 'welcome-bot', name: 'Welcome Bot', desc: "Basic bot that showcases some of the bot's functionality" },
  { id: 'small-talk', name: 'Small Talk', desc: 'Includes basic smalltalk examples' },
  { id: 'empty-bot', name: 'Empty Bot', desc: 'Start fresh with a clean flow' },
  { id: 'learn-mlchain', name: 'Learn Mlchain Basics', desc: 'Learn Mlchain basic features' }
]

const entryPoint: sdk.ModuleEntryPoint = {
  botTemplates,
  translations: { en, fr, es },
  definition: {
    name: 'builtin',
    menuIcon: 'fiber_smart_record',
    fullName: 'Mlchain Builtins',
    homepage: 'https://mlchain.com',
    noInterface: true
  }
}

export default entryPoint
