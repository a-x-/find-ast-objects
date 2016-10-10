#!/usr/bin/env node
// env: VERBOSE
// usage: require('find-ast-objects')('**/*.js', (node) => node.foo === 'bar')

const acorn = require('acorn')
const fs = require('fs')
const estraverse = require('estraverse')
const _ = require('lodash')
const read = name => fs.readFileSync(name, 'utf8')
const astMap = require('./common/ast-map')
const globMap = require('./common/glob-map')

module.exports = function findAstObjects(globPattern, filterNode) {
    // console.log('Promise', Promise.all);
    return globMap(globPattern, file => {
        // console.log('file', file); // todo tmp
        if (file.match(/i18n|deps/)) return

        const code = read(file)
        const ast = acorn.parse(code, {
            locations: true,
            allowHashBang: true,
        })

        return astMap(ast, (node, parent) => {
            if (node.type !== 'ObjectExpression') return
            if (!filterNode(node)) return

            // catch it!
            const from = node.loc.start.line
            const to = node.loc.end.line
            const snippet = code.split(/\n/).slice(from - 1, to).join('\n')
            process.env.VERBOSE && console.log(`${file}:${from}`)
            process.env.VERBOSE > 1 && console.log(snippet)
            return {snippet: snippet, from: from, to: to, node: node, ast: ast, code: code, file: file}
        })
    })
    .then(occurences => Promise.all(occurences))
}
