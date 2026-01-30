const { ShellTester } = require('shell-tester')

const TESTER_SHELL_COMMAND =
  process.env.TESTER_SHELL_COMMAND ||
  'docker run -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -h test --init -ti --rm devenv fish'

const PROMPT = '$'

const tester = new ShellTester({
  shellCommand: TESTER_SHELL_COMMAND,
})

tester.session('basic', async (s) => {
  await s.expect(PROMPT)
  await s.send('ls dotfiles\r')
  await s.expect('README')
  await s.expect(PROMPT)

  await s.send('cd\r')
  await s.expect('cd')
  await s.expect(PROMPT)

  await s.capture('basic')
})

tester.session('bat', async (s) => {
  await s.expect(PROMPT)
  await s.send('bat dotfiles/example-updater/test.js -r :8 && sleep inf\r')
  await s.expect('ShellTester')
  await s.capture('example-updater')
})

tester.session('fzf', async (s) => {
  await s.expect(PROMPT)

  await s.send('ls -lh dotfiles\r')
  await s.expect('README')
  await s.expect(PROMPT)

  await s.send('cd dotfiles && gst\r')
  await s.expect('branch')
  await s.expect(PROMPT)

  await s.send('clear\r')
  await s.expect(PROMPT)

  // Repeatedly send Ctrl+R until the fzf window is shown
  await s.retry(async () => {
    await s.send('\x12')
    await s.expect('git', 1000)
  })

  await s.capture('fzf')
})

tester.session('update_dotfiles', async (s) => {
  await s.resize(80, 40)
  await s.expect(PROMPT)
  await s.send('update_dotfiles\r')
  await s.expect('All tasks executed successfully')
  await s.capture('update_dotfiles')
})

tester.session('nvim', async (s) => {
  await s.resize(80, 24)
  await s.expect(PROMPT)
  await s.send('tmux\r')
  await s.expect('[0]')
  await s.send('vim\r')
  await s.expect('NVIM')
  await s.capture('nvim')
})

tester.run()
