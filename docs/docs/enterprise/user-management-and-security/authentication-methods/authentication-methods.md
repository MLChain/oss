---
id: authentication-methods
title: Authentication Methods
---

---

There are three different types of authentication:

1. **Collaborators**: Access the Admin Studio UI to manage and edit chatbots based on their roles.
2. **Chat Users**: Can speak to chatbots listed in the Admin UI.
3. **External Users**: The developer handles user authentication by providing a JWT token to identify the user.

## Authentication Overview

Four authentication strategies are available, namely, Basic, SAML, OAuth2, and LDAP. You can implement these multiple times (for example, you could have two different OAuth2 configurations for different workspaces).
![Authentication Methods](/assets/auth-methods.png)
Regardless of which authentication strategy you use, they are all stored in the database. When you add a new strategy in the `mlchain.config.json` and restart your application, Mlchain will create a new table called `strategy_STRATEGYID`.

Each time you grant access to a user for a specific workspace, an entry is created in the table `workspace_users` with his role.

Chatbots with more than one authentication strategy will exhibit a menu from which you can pick a strategy. You can skip the menu and bookmark a specific strategy by changing the page URL: `/admin/login/STRATEGYID`.

Moreover, you can access a specific workspace by using `/admin/login?workspaceId=WORKSPACEID`

You can find the definition for the various authentication strategies [here](https://github.com/mlchain/oss/blob/master/packages/bp/src/core/config/mlchain.config.ts#L326).

## User Authentication

Using External Authentication, it is possible to authenticate a user on your system, then validate his identity each time he sends a message to the bot. That information can be used in Actions, Hooks, and Transitions on the Flow Editor.

Here's a summary of the process:

1. User authenticates on your platform
2. Your platform returns a JWT token to the user and configures the webchat
3. The token is sent to Mlchain every time a message is sent
4. Mlchain validates the token, decrypts the content, and makes it available through `event.credentials`

### Prerequisite

- A backend that will authenticate the user and generate the JWT token
- The public key used by the backend

### Quick Start

1. Edit `data/global/mlchain.config.json` and set `pro.externalAuth.enabled` to `true`
2. Configure the other variables for the JWT token (issuer, audience, algorithm, publicKey)
3. Restart Mlchain
4. Edit the code of the embedded web chat to send the generated JWT token
5. Enjoy!

Here is an example configuration, [check the complete configuration for more details](https://github.com/mlchain/oss/blob/master/packages/bp/src/core/config/mlchain.config.ts)

```js
"externalAuth": {
  "enabled": true,
  "audience": "users",
  "issuer": "mlchain",
  "algorithm": "HS256"
  "publicKey": "MIIDETCCAfmgAwIBAgIJIHQ75dJxjRuEMA0GCSqGSIb3DQEBCwUAMCYxJDAiBgNVBAMTG2JvdHByZXNzLXNhbWwtaWRwLmF1dGgwLmNvbTAeFw0xOTAxMTUxNTAzMDFaFw0zMjA5MjMxNTAzMDFaMCYxJDAiBgNVBAMTG2JvdHByZXNzLXNhbWwtaWRwLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMUHXzCG3c4iSyU1N1Nzu8LsEIQ8tj5SHG+VtHrhWyfdckq5nP2wy/u6Tt20pdOx+4zu1718x2xVPMwFN9M2uUSJaY6vIXfHofKyn1htuYYzOklLZmnrLX4Pm7YHE2SubAsuwg6e7/sgIZ06T",
  }
```

### How to configure the Public Key

Mlchain can add the public key directly in the `mlchain.config.json` file (on the same line). If you prefer to add the key in a file, remove the property `certificate`, and Mlchain will load the key from `data/global/end_users_auth.pub`

### How to create a new Key Pair

The certificate must be in the PEM format. You can use the below commands to generate one.

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key // Your private key
cat jwtRS256.key.pub // Your public key
```

### Authenticate the user

Once you have generated the JWT token, Mlchain must pass it down to the webchat. It will then be sent to Mlchain with every message and event. There are two different situations:

1. The user is authenticated before the webchat is loaded.

Simply add the external token as an option to the `init` method:

```js
window.mlchainWebChat.init({
  host: "http://localhost:3000",
  botId: botId,
  externalAuthToken: "my.jwt.token"
})
```

2. The user is already discussing with the bot, then he is authenticated

Use the `configure` method to change the option:

```js
window.mlchainWebChat.configure({ externalAuthToken: "my.jwt.token" })
```

### How to use the authenticated payload

When a user is authenticated, the JWT token is automatically decoded. If the token is valid, all the data it contains will be available through the `event.credentials` property. This can be accessed inside Hooks and while using Actions.
