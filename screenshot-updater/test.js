const { ShellTester } = require('./lib')

const tester = new ShellTester()

tester.session('basic', async (s) => {
  await s.expect(s.prompt)
  await s.send('ls\r')
  await s.expect('README')
  await s.expect(s.prompt)
})

tester.run()
