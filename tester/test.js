const pty = require('node-pty')
const fs = require('fs')

async function main() {
  await session('basic', async (s) => {
    await s.expect('❯')
    await s.send('ls\r')
    await s.expect('ls')
    await s.expect('❯')
  })
}

async function session(name, cb) {
  var ptyProcess = pty.spawn('fish', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 16,
    cwd: process.cwd(),
    env: process.env,
  })
  const output = []
  const timing = []
  let expectIndex = 0
  let lastTime = Date.now()
  const listeners = new Set()
  ptyProcess.onData((data) => {
    output.push(data)
    timing.push(Date.now() - lastTime)
    lastTime = Date.now()
    listeners.forEach((l) => l())
  })
  try {
    await cb({
      expect: (str) => {
        return new Promise((resolve) => {
          const check = () => {
            const index = output.join('').indexOf(str, expectIndex)
            if (index !== -1) {
              expectIndex = index + str.length
              listeners.delete(check)
              resolve()
            }
          }
          listeners.add(check)
          check()
        })
      },
      send: (str) => {
        ptyProcess.write(str)
      },
    })
  } finally {
    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp')
    }
    if (!fs.existsSync('tmp/output')) {
      fs.mkdirSync('tmp/output')
    }
    fs.writeFileSync(
      `tmp/output/${name}.js`,
      'SESSION_DATA=' + JSON.stringify({ output, timing }, null, 2),
    )
    ptyProcess.kill()
  }
}

main()
