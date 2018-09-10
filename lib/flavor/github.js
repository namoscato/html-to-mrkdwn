const codeBlock = require('./rules/code-block')

module.exports = function () {
  return {
    taskListItems: {
      filter: function (node) {
        return node.type === 'checkbox' && node.parentNode.nodeName === 'LI'
      },

      replacement: function (content, node) {
        return node.checked ? '☑︎' : '☐'
      }
    },

    highlightedCodeBlock: codeBlock((node) => /highlight-(?:text|source)-([a-z0-9]+)/.test(node.className))
  }
}
