#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-elem-mods-warns.js | less
// usage: subl -n $(node find-elem-mods-warns.js)
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const globPattern = process.argv[2] || '*/blocks-*/**/*.js'
const targetBlocks = [
    'button',
    'button2',
    'link',
]
const target = 'target'

const findTargetAttrsErrors = module.exports = function findTargetAttrsErrors(globPattern, targetBlocks, target) {
    findAstObjects(globPattern, node => {
        if (!node.properties.filter(p => p.key.name === 'block' && _.includes(targetBlocks, p.value.value)).length) return false
        if (!_(node.properties).map('key.name').includes('attrs')) return false

        const hasAttrsTarget = _.chain(node.properties)
            .find(['key.name', 'attrs'])
            .get('value.properties')
            .find(['key.name', target])
            .value()

        if (!hasAttrsTarget) return false

        return true
    })
}

module.parent || findTargetAttrsErrors(globPattern, targetBlocks, target)
