# html-to-mrkdwn [![Build Status](https://travis-ci.org/namoscato/html-to-mrkdwn.svg?branch=master)](https://travis-ci.org/namoscato/html-to-mrkdwn)

Convert HTML to Slack's [mrkdwn](https://api.slack.com/docs/message-formatting) format.

```js
const mrkdwn = require('amo-html-to-mrkdwn')

const html = `
<p><strong>Hello</strong> <a href="https://example.com">cruel</a> <em>world</em>!</p>

<p><img src="https://media.giphy.com/media/5xtDarEbygs3Pu7p3jO/giphy.gif"></p>
`

mrkdwn(html)
```

```json
{
  text: "*Hello* <https://example.com|cruel> _world_!\n\n<https://media.giphy.com/media/5xtDarEbygs3Pu7p3jO/giphy.gif>",
  image: "https://media.giphy.com/media/5xtDarEbygs3Pu7p3jO/giphy.gif",
}
```

## Flavors

Application-specific HTML flavors are supported by including an optional second argument. Supported flavors include:

* `github`
