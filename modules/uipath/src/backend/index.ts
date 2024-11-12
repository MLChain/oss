import * as sdk from 'mlchain/sdk'

import api from './api'

const onServerStarted = async (bp: typeof sdk) => {
  await api(bp)
}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  definition: {
    name: 'uipath',
    menuText: 'UiPath',
    noInterface: true,
    fullName: 'UiPath',
    homepage: 'https://mlchain.com',
    experimental: true
  }
}

export default entryPoint
