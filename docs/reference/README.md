# Mlchain SDK

Mlchain SDK allows you to create _Mlchain Modules_ that extends the functionalities of the platform. Mlchain SDK exposes all the major methods that a Module needs to interact with the core.

We made sure that the SDK is always up-to-date with the latest version of Mlchain. It will always match the current version of your Mlchain installation.

> **Tip**: For step-by-step instructions in how to install a Module or create one, see our _Developer's Guide_ [Module Section](https://mlchain.com/docs/modules/install/).

## How to use Mlchain SDK

To use the SDK in your Module, it has to be recognized by Mlchain.

> **Tip**: Before continuing, please refer to the [Module Building](https://mlchain.com/docs/modules/build/) section of our Developer's Guide to learn how to build your Module.

### Definition File

The Mlchain SDK definition file (`mlchain.d.ts`) can be either copied manually from `src/bp/sdk/mlchain.d.ts` or copied automatically while running the `yarn build:modules` in your project root.

Once you have the definition file ready, you can import it with `import sdk from 'mlchain/sdk'` and use it in your code.

### Example usage

```javascript
import sdk from 'mlchain/sdk'

...

async function sendNewMessage(botId, userId, conversationId, payload) {
  const event = sdk.IO.Event({
    botId,
    channel: 'web',
    direction: 'incoming',
    payload,
    target: userId,
    threadId: conversationId,
    type: payload.type
  })

  const message = await this.db.appendUserMessage(botId, userId, conversationId, persistedPayload)

  sdk.realtime.sendPayload(sdk.RealTimePayload.forVisitor(userId, 'webchat.message', message))
  return sdk.events.sendEvent(event)
}
```

## Quick Start Module

You can use our [quick-start-module](https://github.com/mlchain/quick-start-module) if you want to play around with the SDK in an empty Module.

## Build the SDK Reference

From the project root, run `yarn build:reference`. This will copy the static assets into `docs/reference/public/`.

## Contribute

Our goal is to make sure that Mlchain SDK is always well documented. If you find things you can improve or clarify, feel free to contribute to the [Mlchain SDK definition file](https://github.com/mlchain/oss/blob/master/src/bp/sdk/mlchain.d.ts).
