const { ShellTester } = require('./lib')

const tester = new ShellTester()

tester.session('basic', async (s) => {
  await s.expect('❯')
  await s.send('ls\r')
  await s.expect('ls')
  await s.expect('❯')
})

tester.run()
