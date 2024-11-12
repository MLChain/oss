import axios from 'axios'

import authConfig from '../assets/auth-config'
import { bpConfig } from '../assets/config'
import { clickOn, fillField } from '../utils/expectPuppeteer'
import { getResponse, doesElementExist, waitForHost, loginOrRegister, logout, waitForHostDown } from '../utils'
import { MlchainConfig } from '../../src/core/config/mlchain.config'

const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const getBody = (content: string) => {
  return {
    name: 'mlchain.config.json',
    type: 'main_config',
    location: 'mlchain.config.json',
    botId: false,
    content: content,
    hasChanges: false,
    uri: {
      $mid: 1,
      external: 'bp://files/mlchain.config.json',
      path: '/mlchain.config.json',
      scheme: 'bp',
      authority: 'files'
    },
    lastSaveVersion: 1
  }
}

const extractTokenFromUrlResponse = async (url: string): Promise<string> => {
  const response = await getResponse(url, 'POST')
  const jsonResponse = (await response.json()) as LoginResponse

  return jsonResponse.payload.jwt
}

interface LoginResponse {
  message: string
  payload: {
    exp: number
    jwt: string
  }
  status: string
}

describe('Auth UI', () => {
  let jwt: string
  let defaultMlchainConfig: string

  it('Load Login page', async () => {
    expect(page.url().includes('login') || page.url().includes('register')).toBeTruthy()
  })

  it('Enter credentials and submit', async () => {
    let url: string
    if (page.url().includes('/register')) {
      url = `${bpConfig.apiHost}/api/v2/admin/auth/register/basic/default`
    } else {
      url = `${bpConfig.apiHost}/api/v2/admin/auth/login/basic/default`
    }

    await loginOrRegister()

    jwt = await extractTokenFromUrlResponse(url)
  })

  it('Update config', async () => {
    const headers = getHeaders(jwt)
    const readFileResp = await axios.post(
      `${bpConfig.apiHost}/api/v1/bots/___/mod/code-editor/readFile`,
      {
        name: 'mlchain.config.json',
        type: 'main_config',
        location: 'mlchain.config.json',
        botId: false
      },
      headers
    )
    expect(readFileResp.status).toEqual(200)
    defaultMlchainConfig = readFileResp.data.fileContent

    const mlchainConfig: MlchainConfig = JSON.parse(readFileResp.data.fileContent)

    mlchainConfig.pro.licenseKey = bpConfig.licenseKey || ''
    mlchainConfig.pro.enabled = true
    mlchainConfig.pro.externalAuth = { enabled: true, algorithms: ['HS256'] }
    mlchainConfig.pro.collaboratorsAuthStrategies = authConfig.pro.collaboratorsAuthStrategies || []
    mlchainConfig.authStrategies = authConfig.authStrategies

    const saveFileResp = await axios.post(
      `${bpConfig.apiHost}/api/v1/bots/___/mod/code-editor/save`,
      getBody(JSON.stringify(mlchainConfig)),
      headers
    )
    expect(saveFileResp.status).toEqual(200)

    // Redirect to avoid frontend errors during server reboot
    await page.goto('https://mlchain.com/')

    // Reboot is required after adding auth strategies
    const rebootResp = await axios.post(`${bpConfig.apiHost}/api/v2/admin/management/rebootServer`, undefined, headers)
    expect(rebootResp.status).toEqual(200)

    // Wait for host to be down before checking it is up
    await waitForHostDown(bpConfig.apiHost)

    await waitForHost(bpConfig.apiHost)
    await page.goto(`${bpConfig.host}`)

    await logout()
  })

  it('Preview non-hidden auth strategies', async () => {
    await page.goto(`${bpConfig.host}/admin/login`)

    expect(await doesElementExist('#btn-default-signin')).toBeTruthy()
    expect(await doesElementExist('#btn-mlchain-signin')).toBeTruthy()
    expect(await doesElementExist('#btn-mlchain2')).toBeFalsy()
  })

  it('Revert config', async () => {
    await clickOn('#btn-default-signin')
    await fillField('#email-login', bpConfig.email)
    await fillField('#password-login', bpConfig.password)
    await clickOn('#btn-signin')

    const token = await extractTokenFromUrlResponse(`${bpConfig.apiHost}/api/v2/admin/auth/login/basic/default`)

    const saveFileResp = await axios.post(
      `${bpConfig.apiHost}/api/v1/bots/___/mod/code-editor/save`,
      getBody(defaultMlchainConfig),
      getHeaders(token)
    )
    expect(saveFileResp.status).toEqual(200)

    await logout()
  })
})
