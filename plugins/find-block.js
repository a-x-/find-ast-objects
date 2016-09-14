#!/usr/bin/env node
// env: VERBOSE
// usage: find-block.js '*/blocks-*/**/*.js' block-name
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const getMod = (node, mod) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.properties')
    .find(['key.name', mod])
    .value()

const isModsPlainObject = (node) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.type')
    .value() === 'ObjectExpression'

const globPattern = process.argv[2] || '*/blocks-*/**/*.js'

const findBlock = module.exports = function findBlock(globPattern, targetBlock) {
    findAstObjects(globPattern, node => {
        return node.properties.filter(p => p.key.name === 'block' && p.value.value === targetBlock).length
    })
}

module.parent || findBlock(globPattern, process.argv[3])
