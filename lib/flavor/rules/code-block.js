module.exports = (filter) => ({
  filter: function (node) {
    var firstChild = node.firstChild
    return (
      node.nodeName === 'DIV' &&
      firstChild &&
      firstChild.nodeName === 'PRE' &&
      (typeof filter !== 'function' || filter(node))
    )
  },
  replacement: function (content, node, options) {
    return (
      '\n\n' + options.fence + '\n' +
      node.firstChild.textContent.trim() +
      '\n' + options.fence + '\n\n'
    )
  }
})
