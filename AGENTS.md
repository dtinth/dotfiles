# AGENTS.md

This file contains development guidelines and commands for agentic coding agents working in this dotfiles repository.

## Project Overview

This is a personal dotfiles repository containing configuration files for various development tools. The project includes:
- Shell configurations (Fish shell)
- Development environment setup
- Docker-based development environment
- Documentation and testing infrastructure

## Build/Test Commands

### Testing
- **Run tests**: `node example-updater/test.js`
- **Install test dependencies**: `yarn --cwd=example-updater`
- **Update example screenshots**: `node example-updater/update.js`

### Docker Commands
- **Build development environment**: `docker build -t devenv:latest .`
- **Run development environment**: `docker run -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -h test --init -ti --rm devenv fish`

### Documentation
- **Update abbreviations documentation**: `node docs/scripts/update-abbr.js`

## Code Style Guidelines

### JavaScript/Node.js
- **Formatting**: Use Prettier with configuration in `.prettierrc`:
  - Single quotes: `true`
  - Semicolons: `false`
  - Trailing commas: `all`
- **No JSDoc comments** unless specifically requested
- **Modern Node.js**: Use `require()` for imports (CommonJS style as seen in existing code)
- **Error handling**: Use try/catch blocks for async operations
- **File operations**: Use `fs.existsSync()` before reading files when appropriate

### Shell Scripts (Fish)
- **Use Fish shell** syntax for shell configurations
- **Abbreviations**: Define using `abbr --add` format
- **Conditional commands**: Use `if command -v <command> 1>/dev/null 2>&1` for feature detection

### File Organization
- **Fish configs**: Place in `fish/conf.d/` for configuration, `fish/functions/` for functions
- **Node.js scripts**: Place in appropriate subdirectories with descriptive names
- **Documentation**: Use Antora format in `docs/` directory

## Import Patterns

### JavaScript
```javascript
// Use require() for CommonJS modules
const fs = require('fs')
const { basename } = require('path')
const { chromium } = require('playwright')
```

## Naming Conventions

### Variables/Functions
- **camelCase** for JavaScript variables and functions
- **kebab-case** for file names (except when package.json requires otherwise)
- **UPPER_CASE** for environment variables and constants

### Files
- JavaScript files use `.js` extension
- Fish shell functions use `.fish` extension
- Configuration files follow tool-specific conventions

## Error Handling

### JavaScript
- Use try/catch blocks for async operations
- Check file existence before reading when appropriate
- Use `make-promises-safe` for global promise rejection handling

### Example Patterns
```javascript
// Async error handling
try {
  await browser.close()
  await imagePool.close()
} catch (error) {
  console.error(error)
}

// File operations with existence check
if (fs.existsSync(textFile) && fs.readFileSync(textFile, 'utf8') === text) {
  console.log(`=> ${name} is up-to-date`)
  continue
}
```

## Testing Patterns

### Shell Testing
- Use `shell-tester` package for terminal interaction testing
- Define sessions with descriptive names
- Use `await s.expect()` for waiting for prompts
- Use `await s.capture()` for capturing screenshots

### Example Test Structure
```javascript
tester.session('basic', async (s) => {
  await s.expect(PROMPT)
  await s.send('ls dotfiles\r')
  await s.expect('README')
  await s.expect(PROMPT)
  await s.capture('basic')
})
```

## Development Workflow

### Before Making Changes
1. Install dependencies: `yarn --cwd=example-updater`
2. Run existing tests to ensure baseline: `node example-updater/test.js`
3. Check code formatting with Prettier

### After Making Changes
1. Run tests to verify changes: `node example-updater/test.js`
2. Update screenshots if needed: `node example-updater/update.js`
3. Ensure code follows Prettier formatting

## Environment Variables

- `TESTER_SHELL_COMMAND`: Override default Docker shell command for testing
- `SCREENSHOT_OUTPUT`: Override output directory for screenshot generation
- `AUTOMATRON_SOURCE`: Source identifier for automatron scripts

## Repository-Specific Patterns

### Docker Integration
- Development environment runs in Docker container
- Tests run inside Docker containers
- Use volume mounts for Docker socket access

### Documentation Generation
- Scripts automatically generate documentation from configuration files
- Use glob patterns for file discovery
- Output in Antora AsciiDoc format

## Tooling

- **Node.js 16.x** (as specified in GitHub Actions)
- **Docker** for containerized development
- **Fish** as primary shell
- **Prettier** for code formatting
- **Playwright** for screenshot generation
- **shell-tester** for terminal testing

## CI/CD Monitoring

### Waiting for GitHub Actions Checks
When working with pull requests, use the **wait-for-ci** skill to monitor check status:

```bash
# Monitor PR checks until completion
mise exec deno -- deno run --allow-run=gh --allow-env https://github.com/dtinth/wait-for-ci/raw/main/wait-for-ci.ts
```

This command:
- Monitors the current branch's PR status checks
- Polls periodically and prints status updates
- Shows summary when all checks finish
- Exits with appropriate status

## Notes

- This repository uses GitHub Actions for CI/CD
- Images are built and published to GitHub Container Registry
- The main development environment is containerized for consistency
- Tests include both functional testing and screenshot verification