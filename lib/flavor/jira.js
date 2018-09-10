const codeBlock = require('./rules/code-block')
const link = require('./rules/link')
const util = require('./rules/util')

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

module.exports = function (options) {
  return {
    citation: {
      filter: 'cite',
      replacement: (content) => `_— ${content}_`
    },

    code: {
      filter: 'tt',
      replacement: (content) => `\`${content}\``
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

    issueMacro: {
      filter: (node) => (
        node.nodeName === 'SPAN' &&
        node.className.includes('jira-issue-macro')
      ),
      replacement: (content, node) => {
        const linkNode = node.querySelector('a')

        return link.replacement(linkNode.textContent.trim(), linkNode)
      }
    },

    attachmentFileLink: {
      filter: (node, options) => link.filter(node, options) && node.getAttribute('data-attachment-type') === 'file',
      replacement: (content, node) => createLink(node.textContent.trim(), node)
    },

    attachmentImageLink: {
      filter: (node, options) => link.filter(node, options) && node.getAttribute('file-preview-type') === 'image',
      replacement: (content, node) => createLink(`🖼 ${node.title}`, node)
    }
  }

  function createLink (content, node) {
    const text = `${content} ⬇️`

    return options.jiraBaseUrl ? util.createLink(`${options.jiraBaseUrl}${node.getAttribute('href')}`, text) : text
  }
}
