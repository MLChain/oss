import * as sdk from 'mlchain/sdk'
import * as renderEnums from 'core/cms/enums'
import * as dialogEnums from 'core/dialog/enums'
import * as logEnums from 'core/logger/enums'

const impl = <typeof sdk>{
  version: process.MLCHAIN_VERSION,
  LoggerLevel: logEnums.LoggerLevel,
  LogLevel: logEnums.LogLevel,
  NodeActionType: dialogEnums.NodeActionType,
  ButtonAction: renderEnums.ButtonAction
}

module.exports = impl
