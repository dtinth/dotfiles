require('make-promises-safe')

const { chromium } = require('playwright')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const { basename } = require('path')
const outputDirectory = process.env.SCREENSHOT_OUTPUT || 'tmp/examples'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    deviceScaleFactor: 2,
  })
  await page.goto('file://' + __dirname + '/preview.html')

  for (const outputFile of glob.sync('tmp/output/*.js')) {
    const rawData = fs.readFileSync(outputFile, 'utf8')
    const output = JSON.parse(rawData.slice(rawData.indexOf('{')))
    const name = basename(outputFile, '.js')

    const textFile = `${outputDirectory}/${name}.txt`
    const pngFile = `${outputDirectory}/${name}.png`
    const text = output.text
      .map((line) => line.trimEnd())
      .join('\n')
      .trimEnd()

    if (fs.existsSync(textFile) && fs.readFileSync(textFile, 'utf8') === text) {
      console.log(`=> ${name} is up-to-date`)
      continue
    }

    const data = output.events
      .filter((x) => x.type === 'output')
      .map((x) => x.data)
      .join('')

    await page.evaluate((data) => {
      show(data)
    }, data)

    mkdirp.sync(outputDirectory)
    const elementHandle = await page.$('#terminal .xterm-screen')
    await elementHandle.screenshot({ path: pngFile })
    fs.writeFileSync(textFile, text)
    console.error(`=> ${name} updated`)
  }

  await browser.close()
}

main()
