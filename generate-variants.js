var fs = require('fs')
var path = require('path')
var possible = require('possible-objects')
var Mustache = require('mustache')

var templateFile = process.argv[2]

var schemaFile = templateFile.replace('.cform', '.json')

var base = path.basename(templateFile, '.cform')

if (!fs.existsSync(templateFile)) {
  console.error('Missing ' + templateFile)
  process.exit(1) }

var template = fs.readFileSync(templateFile).toString()

var schema = (
  !fs.existsSync(schemaFile) ?
    { } : JSON.parse(fs.readFileSync(schemaFile)) )

if (!fs.existsSync(path.join(__dirname, 'variants'))) {
  fs.mkdirSync(path.join(__dirname, 'variants')) }

possible(schema)
  .forEach(function(variant, index) {
    fs.writeFileSync(
      path.join(__dirname, 'variants', ( base + '.' + index + '.variant' )),
      Mustache.render(template, variant)
        .replace(/\n+/g, '\n')) })
