module.exports = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'slack' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    var href = node.getAttribute('href')
    return `<${href}|${content}>`
  }
}
