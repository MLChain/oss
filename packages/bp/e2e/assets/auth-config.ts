import { MlchainConfig } from '../../src/core/config/mlchain.config'

const authConfig: { authStrategies: MlchainConfig['authStrategies']; pro: Partial<MlchainConfig['pro']> } = {
  pro: {
    collaboratorsAuthStrategies: ['default', 'mlchain', 'mlchain2']
  },
  authStrategies: {
    default: {
      type: 'basic',
      allowSelfSignup: false,
      options: {
        maxLoginAttempt: 0
      },
      hidden: false
    },
    mlchain: {
      type: 'oauth2',
      options: {
        authorizationURL: 'https://example.auth0.com/authorize',
        tokenURL: 'https://example.auth0.com/oauth/token',
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret',
        callbackURL: 'http://localhost:3000/api/v1/auth/login-callback/oauth2/mlchain',
        userInfoURL: 'https://example.auth0.com/userinfo',
        jwtToken: {
          audience: 'my-audience',
          issuer: 'some-issuer',
          algorithms: ['HS256'],
          publicKey: ''
        },
        scope: 'openid profile email'
      },
      fieldMapping: {
        email: 'email'
      },
      allowSelfSignup: false,
      hidden: false
    },
    mlchain2: {
      type: 'oauth2',
      options: {
        authorizationURL: 'https://example.auth0.com/authorize',
        tokenURL: 'https://example.auth0.com/oauth/token',
        clientID: 'your-client-id',
        clientSecret: 'your-client-secret',
        callbackURL: 'http://localhost:3000/api/v1/auth/login-callback/oauth2/mlchain',
        userInfoURL: 'https://example.auth0.com/userinfo',
        jwtToken: {
          audience: 'my-audience',
          issuer: 'some-issuer',
          algorithms: ['HS256'],
          publicKey: ''
        },
        scope: 'openid profile email'
      },
      fieldMapping: {
        email: 'email'
      },
      allowSelfSignup: false,
      hidden: true
    }
  }
}

export default authConfig
