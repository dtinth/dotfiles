const { ShellTester } = require('./lib')

const TESTER_SHELL_COMMAND =
  process.env.TESTER_SHELL_COMMAND ||
  'docker run -h test --init -ti --rm dotfiles_shell fish'

const tester = new ShellTester({
  shellCommand: TESTER_SHELL_COMMAND,
})

tester.session('basic', async (s) => {
  await s.expect(s.prompt)
  await s.send('ls\r')
  await s.expect('README')
  await s.expect(s.prompt)

  await s.send('cd\r')
  await s.expect('cd')
  await s.expect(s.prompt)

  await s.capture('basic')
})

tester.session('bat', async (s) => {
  await s.expect(s.prompt)
  await s.send('bat example-updater/test.js -r :8 && sleep inf\r')
  await s.expect('ShellTester')
  await s.capture('example-updater')
})

tester.session('fzf', async (s) => {
  await s.expect(s.prompt)

  await s.send('ls -lh\r')
  await s.expect('README')
  await s.expect(s.prompt)

  await s.send('gst\r')
  await s.expect('branch')
  await s.expect(s.prompt)

  await s.send('clear\r')
  await s.expect(s.prompt)

  // Repeatedly send Ctrl+R until the fzf window is shown
  await s.retry(async () => {
    await s.send('\x12')
    await s.expect('git', 1000)
  })

  await s.capture('fzf')
})

tester.session('update_dotfiles', async (s) => {
  await s.resize(80, 40)
  await s.expect(s.prompt)
  await s.send('update_dotfiles\r')
  await s.expect('All tasks executed successfully')
  await s.capture('update_dotfiles')
})

tester.run()
