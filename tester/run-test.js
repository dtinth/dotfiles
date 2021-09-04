var pty = require('node-pty')
var ptyProcess = pty.spawn('fish', [], {
  name: 'xterm-color',
  cols: 80,
  rows: 16,
  cwd: process.env.HOME,
  env: process.env,
})

ptyProcess.on('data', function (data) {
  process.stdout.write(data)
})

ptyProcess.write('ls\r')
ptyProcess.resize(100, 40)
ptyProcess.write('ls\r')
ptyProcess.kill()
