const codeBlock = require('./rules/code-block')

const emoticonEmojiMap = {
  smile: '🙂',
  sad: '🙁',
  tongue: '😛',
  biggrin: '😁',
  wink: '😉',
  thumbs_up: '👍',
  thumbs_down: '👎',
  information: 'ℹ️',
  check: '✅',
  error: '❌',
  warning: '⚠️',
  add: '➕',
  forbidden: '⛔️',
  help_16: '❓',
  lightbulb_on: '💡',
  lightbulb: '💡',
  star_yellow: '⭐️',
  star_red: '⭐️',
  star_green: '⭐️',
  star_blue: '⭐️',
  flag: '🚩',
  flag_grey: '🏳'
}

const emoticonSrcRegex = /^\/images\/icons\/emoticons\/(\w+)\.png$/

module.exports = {
  citation: {
    filter: 'cite',
    replacement: (content) => `_— ${content}_`
  },

  codeBlock: codeBlock((node) => node.className.includes('codeContent')),

  emoticon: {
    filter: (node) => (
      node.nodeName === 'IMG' &&
      node.className === 'emoticon' &&
      emoticonSrcRegex.test(node.src)
    ),
    replacement: (content, node) => {
      const emoticon = node.src.match(emoticonSrcRegex)[1]

      return typeof emoticonEmojiMap[emoticon] === 'undefined' ? '' : emoticonEmojiMap[emoticon]
    }
  },

  issueMacroIcon: {
    filter: (node) => (
      node.nodeName === 'IMG' &&
      node.className === 'icon' &&
      node.parentNode.className.includes('jira-issue-macro-key')
    ),
    replacement: () => ''
  },

  issueMacroStatus: {
    filter: (node) => (
      node.nodeName === 'SPAN' &&
      node.className.includes('aui-lozenge') &&
      node.parentNode.className === 'jira-issue-macro'
    ),
    replacement: () => ''
  }
}
