const { chromium } = require('playwright')
const fs = require('fs')

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({
    deviceScaleFactor: 2,
  })
  await page.goto('file://' + __dirname + '/preview.html')

  const rawData = fs.readFileSync('tmp/output/basic.js', 'utf8')
  const data = JSON.parse(rawData.slice(rawData.indexOf('{'))).output.join('')

  await page.evaluate((data) => {
    show(data)
  }, data)

  const elementHandle = await page.$('#terminal .xterm-screen')
  await elementHandle.screenshot({ path: 'tmp/output/basic.png' })

  await browser.close()
}

main()
