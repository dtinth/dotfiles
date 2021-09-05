require('make-promises-safe')

const { chromium } = require('playwright')
const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const { basename } = require('path')
const { ImagePool } = require('@squoosh/lib')

const outputDirectory = process.env.SCREENSHOT_OUTPUT || 'tmp/examples'

async function main() {
  const browser = await chromium.launch()
  const imagePool = new ImagePool()
  try {
    const page = await browser.newPage({
      deviceScaleFactor: 2,
    })
    await page.goto(
      'file://' + __dirname + '/node_modules/shell-tester/preview.html',
    )

    for (const outputFile of glob.sync('tmp/output/*.js')) {
      const rawData = fs.readFileSync(outputFile, 'utf8')
      const output = JSON.parse(rawData.slice(rawData.indexOf('{')))

      if (output.implicit) {
        continue
      }

      const name = basename(outputFile, '.js')

      const textFile = `${outputDirectory}/${name}.txt`
      const pngFile = `${outputDirectory}/${name}.png`
      const text = output.text
        .map((line) => line.trimEnd())
        .join('\n')
        .trimEnd()

      if (
        fs.existsSync(textFile) &&
        fs.readFileSync(textFile, 'utf8') === text
      ) {
        console.log(`=> ${name} is up-to-date`)
        continue
      }

      await page.evaluate((output) => show(output), output)

      mkdirp.sync(outputDirectory)
      const elementHandle = await page.$('#terminal .xterm-screen')
      const pngBuffer = await elementHandle.screenshot()

      // Compress the image using `@squoosh/lib`
      const image = imagePool.ingestImage(pngBuffer)
      await image.preprocess({ quant: { numColors: 64, dither: 0.5 } })
      await image.encode({ oxipng: {} })
      const rawEncodedImage = (await image.encodedWith.oxipng).binary

      fs.writeFileSync(textFile, text)
      fs.writeFileSync(pngFile, rawEncodedImage)

      console.error(`=> ${name} updated`)
    }
  } finally {
    await browser.close()
    await imagePool.close()
  }
}

main()
