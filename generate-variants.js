const fs = require('fs')
const path = require('path')
const possible = require('possible-objects')
const Mustache = require('mustache')

const templateFile = process.argv[2]

const schemaFile = templateFile.replace('.md', '.json')

const base = path.basename(templateFile, '.md')

if (!fs.existsSync(templateFile)) {
  console.error('Missing ' + templateFile)
  process.exit(1)
}

const template = fs.readFileSync(templateFile).toString()

const schema = (
  !fs.existsSync(schemaFile)
    ? { }
    : JSON.parse(fs.readFileSync(schemaFile)))

if (!fs.existsSync(path.join(__dirname, 'variants'))) {
  fs.mkdirSync(path.join(__dirname, 'variants'))
}

possible(schema)
  .forEach(function (variant, index) {
    fs.writeFileSync(
      path.join(__dirname, 'variants', (base + '-' + index + '.md')),
      Mustache.render(template, variant)
        .replace(/\n+/g, '\n'))
  })
