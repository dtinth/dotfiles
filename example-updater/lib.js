const pty = require('node-pty')
const fs = require('fs')
const mkdirp = require('mkdirp')
const { Terminal } = require('xterm-headless/')

const TESTER_SHELL_COMMAND =
  process.env.TESTER_SHELL_COMMAND ||
  'docker run -h test --init -ti --rm dotfiles_shell fish'

class ShellTester {
  _sessionsDefinitions = []

  /**
   * @param {string} name
   * @param {(session: ShellSession) => Promise<void>} callback
   */
  session(name, callback) {
    this._sessionsDefinitions.push({
      name,
      callback,
    })
  }

  async run(argv = process.argv.slice(2)) {
    require('make-promises-safe')
    const sessionsToRun = argv.length
      ? this._sessionsDefinitions.filter(({ name }) => argv.includes(name))
      : this._sessionsDefinitions
    for (const sessionDefinition of sessionsToRun) {
      console.log(`Running session ${sessionDefinition.name}`)
      await this._runSession(sessionDefinition)
    }
  }

  async _runSession({ name, callback }) {
    const command = TESTER_SHELL_COMMAND
    const cols = 80
    const rows = 16
    const ptyProcess = pty.spawn('bash', ['-c', command], {
      cols,
      rows,
      name: 'xterm-color',
      cwd: process.cwd(),
      env: process.env,
    })
    const shellSession = new ShellSession(ptyProcess)
    try {
      await callback(shellSession)
    } finally {
      await shellSession.capture(name + '_end', { implicit: true })
      ptyProcess.kill()
    }
  }
}

class Stabilizer {
  _lastTime = Date.now()
  debounce() {
    this._lastTime = Date.now()
  }
  get _timeToStabilize() {
    return this._lastTime + 100
  }
  async waitUntilStabilized() {
    while (Date.now() < this._timeToStabilize) {
      await new Promise((resolve) =>
        setTimeout(resolve, this._timeToStabilize - Date.now()),
      )
    }
  }
}

class ShellSession {
  _output = ''
  _events = [{ time: Date.now(), type: 'started' }]
  _listeners = new Set()

  prompt = '❯'

  constructor(ptyProcess) {
    this._ptyProcess = ptyProcess
    this._stabilizer = new Stabilizer()
    const { cols, rows } = ptyProcess
    this._term = new Terminal({ cols, rows })
    ptyProcess.onData((data) => {
      this._stabilizer.debounce()
      this._output += data
      this._events.push({
        time: Date.now(),
        type: 'output',
        data,
      })
      this._term.write(data)
      this._listeners.forEach((l) => l())
    })
  }

  async resize(rows, cols) {
    await this._stabilizer.waitUntilStabilized()
    this._ptyProcess.resize(cols, rows)
    this._events.push({
      time: Date.now(),
      type: 'resize',
      cols,
      rows,
    })
  }

  async expect(str, timeoutMs = 10000) {
    await new Promise((resolve, reject) => {
      const check = () => {
        const index = this._output.indexOf(str)
        if (index !== -1) {
          this._output = this._output.substr(index + str.length)
          this._listeners.delete(check)
          console.error(`=> Found: ${JSON.stringify(str)}`)
          clearTimeout(timeout)
          resolve()
        }
      }
      const timeout = setTimeout(() => {
        this._listeners.delete(check)
        reject(new Error(`Expected ${JSON.stringify(str)} not found`))
      }, timeoutMs)
      this._listeners.add(check)
      check()
    })
    await this._stabilizer.waitUntilStabilized()
  }

  async retry(callback, timeoutMs = 20000) {
    const start = Date.now()
    while (true) {
      try {
        return await callback()
      } catch (e) {
        if (Date.now() - start > timeoutMs) {
          throw e
        }
      }
    }
  }

  async send(data) {
    await this._stabilizer.waitUntilStabilized()
    this._ptyProcess.write(data)
    this._events.push({
      time: Date.now(),
      type: 'send',
      data,
    })
    console.error(`=> Sent:  ${JSON.stringify(data)}`)
  }

  async capture(name, extra = {}) {
    const term = this._term
    const { cols, rows } = this._ptyProcess
    await this._stabilizer.waitUntilStabilized()

    // Show terminal output
    const text = []
    console.log('+' + '-'.repeat(cols) + '+')
    console.log('|' + ` Capture: ${name}`.padEnd(cols) + '|')
    console.log('+' + '-'.repeat(cols) + '+')
    const buffer = term.buffer.active
    for (let i = 0; i < rows; i++) {
      const line = buffer.getLine(i + buffer.viewportY)
      const lineString = line.translateToString()
      text.push(lineString)
      console.log('|' + lineString + '|')
    }
    console.log('+' + '-'.repeat(cols) + '+')

    // Save result to file
    const events = this._events
    mkdirp.sync('tmp/output')
    fs.writeFileSync(
      `tmp/output/${name}.js`,
      'SESSION_DATA=' + JSON.stringify({ ...extra, events, cols, rows, text }),
    )
  }
}

exports.ShellTester = ShellTester