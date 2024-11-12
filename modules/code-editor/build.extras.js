module.exports = {
  copyFiles: [
    'src/mlchain.d.ts',
    'src/typings/node.d.txt',
    'src/typings/es6include.txt',
    'src/typings/bot.config.schema.json',
    'src/typings/mlchain.config.schema.json'
  ]
}

const fs = require('fs')
const path = require('path')

fs.mkdirSync('dist')
fs.copyFileSync(
  path.join(__dirname, '../../packages/bp/src/sdk/mlchain.d.ts'),
  path.join(__dirname, 'dist/mlchain.d.js')
)
