const fs = require('fs')

const abbrs = []

function processFile(path) {
  const data = fs.readFileSync(path, 'utf8')

  for (const m of data.matchAll(/^\s*__git\.create_abbr\s+(\S+)\s+(.*)$/gm)) {
    abbr(m[1], m[2], m.index, path, data)
  }

  for (const m of data.matchAll(/^\s*abbr\s+--add\s+(\S+)\s+(.*)$/gm)) {
    abbr(m[1], m[2], m.index, path, data)
  }
}

const toHide = new Set(['grbd', 'grbdi', 'grbdia'])

function abbr(name, expansion, index, path, fileContents) {
  if (toHide.has(name)) return

  expansion = unquote(expansion).replace(
    /^ggp /,
    'git push origin (__git.current_branch) ',
  )

  if (expansion.startsWith('git flow ')) return

  abbrs.push({
    name: unquote(name),
    expansion: expansion,
    sortKey: expansion.toLowerCase().replace(/^sudo\s+/, ''),
    where: getGitHubUrl(path, index, fileContents),
  })
}

function unquote(str) {
  return str
    .replace(/^"(.*)"$/, '$1')
    .replace(/^'(.*)'$/, '$1')
    .replace(/\\([()])/g, '$1')
}

function getGitHubUrl(path, index, fileContents) {
  if (path.startsWith('/')) return null
  const lineNumber = getLineNumber(index, fileContents)
  return `https://github.com/dtinth/dotfiles/blob/master/${path}#L${lineNumber}`
}

function getLineNumber(index, fileContents) {
  let lineNumber = 1
  for (let i = 0; i < index && i < fileContents.length; i++) {
    if (fileContents[i] === '\n') {
      lineNumber++
    }
  }
  return lineNumber
}

function escapeMarkdown(x) {
  return x.replace(/\|/g, '\\|')
}

processFile(process.env.HOME + '/.config/fish/functions/__git.init.fish')
processFile('fish/conf.d/abbreviations.fish')

abbrs.sort((a, b) => a.sortKey.localeCompare(b.sortKey))

const out = ['| Expansion | Name |', '| --------- | ---- |']
for (const abbr of abbrs) {
  out.push(
    `| \`${escapeMarkdown(abbr.expansion)}\` | \`${abbr.name}\` |`,
  )
}

fs.writeFileSync('docs/includes/abbr_table.md', out.join('\n'))
