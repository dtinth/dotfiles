require('make-promises-safe')

const { chromium } = require('playwright')
const fs = require('fs')
const glob = require('glob')

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    deviceScaleFactor: 2,
  })
  await page.goto('file://' + __dirname + '/preview.html')

  for (const outputFile of glob.sync('tmp/output/*.js')) {
    const rawData = fs.readFileSync(outputFile, 'utf8')
    const data = JSON.parse(rawData.slice(rawData.indexOf('{')))
      .events.filter((x) => x.type === 'output')
      .map((x) => x.data)
      .join('')

    await page.evaluate((data) => {
      show(data)
    }, data)

    const elementHandle = await page.$('#terminal .xterm-screen')
    const outputPath = outputFile.replace(/\.\w+$/, '.png')
    await elementHandle.screenshot({
      path: outputPath,
    })
    console.error(`=> Wrote ${outputPath}`)
  }

  await browser.close()
}

main()
