const pty = require('node-pty')
const fs = require('fs')
const mkdirp = require('mkdirp')

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
    const command = 'docker run --init -ti --rm dotfiles_shell fish'
    const ptyProcess = pty.spawn('bash', ['-c', command], {
      name: 'xterm-color',
      cols: 80,
      rows: 16,
      cwd: process.cwd(),
      env: process.env,
    })
    const shellSession = new ShellSession(ptyProcess)
    try {
      await callback(shellSession)
    } finally {
      ptyProcess.kill()
      const events = shellSession.events
      mkdirp.sync('tmp/output')
      fs.writeFileSync(
        `tmp/output/${name}.js`,
        'SESSION_DATA=' + JSON.stringify({ events }),
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
    this.ptyProcess = ptyProcess
    ptyProcess.onData((data) => {
      this._output += data
      this._events.push({
        time: Date.now(),
        type: 'output',
        data,
      })
      console.error(`<= Received: ${JSON.stringify(data)}`)
      this._listeners.forEach((l) => l())
    })
  }

  async expect(str) {
    return new Promise((resolve) => {
      const check = () => {
        const index = this._output.indexOf(str)
        if (index !== -1) {
          this._output = this._output.substr(index + str.length)
          this._listeners.delete(check)
          console.error(`=> Found: ${JSON.stringify(str)}`)
          resolve()
        }
      }
      this._listeners.add(check)
      check()
    })
  }

  async send(data) {
    this.ptyProcess.write(data)
    this._events.push({
      time: Date.now(),
      type: 'send',
      data,
    })
    console.error(`=> Sent:  ${JSON.stringify(data)}`)
  }

  get events() {
    return this._events
  }
}

exports.ShellTester = ShellTester
