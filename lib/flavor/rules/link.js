const util = require('./util')

module.exports = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'slack' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    return util.createLink(node.getAttribute('href'), content)
  }
}
