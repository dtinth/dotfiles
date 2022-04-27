#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title automatron
// @raycast.mode silent

// Optional parameters:
// @raycast.icon 🤖
// @raycast.argument1 { "type": "text", "placeholder": "Text to send" }
// @raycast.packageName dtinth

// Documentation:
// @raycast.description Invokes the automatron chat bot
// @raycast.author dtinth

const fs = require('fs')
const { execSync } = require('child_process')
const credentialsPath = process.env.HOME + '/.credentials/automatron.json'
const credentials = JSON.parse(fs.readFileSync(credentialsPath))
const response = execSync(
  `curl -s -X POST -H "Content-Type: application/json" -d@- '${credentials.url}/text'`,
  {
    input: JSON.stringify({
      key: credentials.key,
      text: process.argv.slice(2).join(' '),
      source: process.env.AUTOMATRON_SOURCE || 'raycast',
    }),
    encoding: 'utf8',
  },
)
let text = response
try {
  const data = JSON.parse(response)
  if (data.ok) {
    const result = data.result
    if (typeof result === 'string') {
      text = result
    } else if (
      Array.isArray(result) &&
      result.length === 1 &&
      result[0].type === 'text'
    ) {
      text = result[0].text
    }
  }
} catch (error) {
  console.error(error)
}
console.log(text)
