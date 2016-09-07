#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-elem-mods-warns.js | less
// usage: subl -n $(node find-elem-mods-warns.js)

const acorn = require('acorn')
const fs = require('fs')
const Glob = require('glob')
const estraverse = require('estraverse')
const _ = require('lodash')
const read = name => fs.readFileSync(name, 'utf8')
const glob = (glob, each) => Glob(glob, (err, files) => files && files.filter(file => file).map(each))

module.exports = function findTargetAttrsErrors(globPattern, filterNode) {
    glob(globPattern, file => {
        if (file.match(/i18n|deps/)) return

        const code = read(file)
        const ast = acorn.parse(code, {
            locations: true,
        })

        estraverse.traverse(ast, {
            enter: (node, parent) => {
                if (node.type !== 'ObjectExpression') return
                if (!filterNode(node)) return

                // catch it!
                console.log(`${file}:${node.loc.start.line}`)
                const from = node.loc.start.line - 1
                const to = node.loc.end.line
                process.env.VERBOSE && console.log(code.split(/\n/).slice(from, to).join('\n'))
            }
        })
    })
}
