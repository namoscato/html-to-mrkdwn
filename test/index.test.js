const fs = require('fs')
const { join } = require('path')

const mrkdwn = require('..')

generateTests('test/fixtures')

test('returns images', () => {
  const html = `
    <p><strong>Hello</strong> <a href="https://example.com">cruel</a> <em>world</em>!</p>
    <p><img src="https:/example.com/first.gif"></p>
    <p><img src="https:/example.com/secon.gif"></p>
  `

  const { image } = mrkdwn(html)
  expect(image).toEqual('https://example.com/first.gif')
})

function generateTests (directory, flavor) {
  const subdirectories = []

  fs.readdirSync(directory).forEach(file => {
    const filePath = join(directory, file)

    if (fs.lstatSync(filePath).isDirectory()) {
      subdirectories.push([filePath, file])
    }

    if (!file.endsWith('.mrkdwn')) {
      return
    }

    test(`${flavor ? flavor + '/' : ''}${file.replace('.mrkdwn', '')}`, () => {
      const content = fs.readFileSync(filePath).toString()
      const [input, output] = content.split('====')
      expect(mrkdwn(input, flavor, { jiraBaseUrl: 'https://www.atlassian.com' }).text.trim()).toEqual(output.trim())
    })
  })

  subdirectories.map(subdirectory => generateTests.apply(subdirectory, subdirectory))
}
