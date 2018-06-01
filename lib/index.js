const TurnDown = require('turndown')

const firstImage = require('./first-image')
const flavorPlugin = require('./flavor')

const service = new TurnDown({
  bulletListMarker: '•',
  strongDelimiter: '*',
  emDelimiter: '_',
  codeBlockStyle: 'fenced',
  linkStyle: 'slack'
})

// override escaping
// https://api.slack.com/docs/message-formatting#how_to_escape_characters
service.escape = (string) => (
  string.replace('&', '&amp;')
    .replace('<', '&lt;')
    .replace('>', '&gt;')
)

module.exports = (html, flavor) => {
  if (typeof flavor !== 'undefined' && flavor !== 'base') {
    service.use(flavorPlugin(flavor))
  }

  service.use(flavorPlugin('base'))

  return {
    text: service.turndown(html),
    image: firstImage(html)
  }
}
