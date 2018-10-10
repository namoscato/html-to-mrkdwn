const Table = require('cli-table')
const link = require('./rules/link')

module.exports = function () {
  return {
    slackLink: link,

    // Slack doesn't support headings, so we'll just make them all bold
    heading: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: (content, node, options) => `\n${options.strongDelimiter}${content}${options.strongDelimiter}\n`
    },

    listItem: {
      filter: 'li',
      replacement: function (content, node, options) {
        let inCodeBlock = false

        content = content
          .replace(/^\n+/, '') // remove leading newlines
          .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
          .split('\n')
          .map((line, i) => {
            if (line.startsWith(options.fence)) {
              inCodeBlock = !inCodeBlock
            } else if (!inCodeBlock && line.length > 0) {
              line = `    ${line}` // indent
            }

            return line
          })
          .join('\n')

        var prefix = options.bulletListMarker + ' '
        var parent = node.parentNode
        if (node.className.indexOf('task-list-item') >= 0) {
          prefix = ''
        } else if (parent.nodeName === 'OL') {
          var start = parent.getAttribute('start')
          var index = Array.prototype.indexOf.call(parent.children, node)
          prefix = (start ? Number(start) + index : index + 1) + '. '
        }
        return (
          prefix + content.trim() + (node.nextSibling ? '\n' : '')
        )
      }
    },

    // Slack doesn't support images, so just show the link
    images: {
      filter: 'img',
      replacement: function (content, node) {
        const parent = node.parentNode
        if (parent && parent.nodeName === 'A') {
          return node.alt || node.src
        } else if (node.alt) {
          return `<${node.src}|${node.alt}>`
        } else {
          return node.src
        }
      }
    },

    strikethrough: {
      filter: ['del', 's', 'strike'],
      replacement: (content) => `~${content}~`
    },

    table: {
      filter: 'table',
      replacement: (content, node, options) => {
        const table = new Table({ colors: false })

        node.querySelectorAll('tr').forEach((row) => {
          const data = []

          row.querySelectorAll('th,td').forEach((cell) => {
            data.push(cell.textContent.trim())
          })

          table.push(data)
        })

        return (
          '\n\n' + options.fence + '\n' +
          table.toString() +
          '\n' + options.fence + '\n\n'
        )
      }
    }
  }
}
