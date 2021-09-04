const { ShellTester } = require('./lib')

const tester = new ShellTester()

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

tester.run()
