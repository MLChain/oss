/**
 * Anything that you would like to make configurable to the bot owner would go in this file.
 * Mlchain handles itself loading the configuration files.
 *
 * Bot configuration files will override Global configuration when available:
 * For example, `data/bots/MY_BOT/config/complete-module.json` will be used by MY_BOT, while `data/global/config/complete-module.json` will be used for all others
 */
export interface Config {
  /**
   * @default https://mlchain.com
   */
  someEndpoint: string
  /**
   * @default 10
   */
  maxMessages: number
}
