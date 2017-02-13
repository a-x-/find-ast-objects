#!/usr/bin/env node
// env: VERBOSE
// usage: find-block.js '*/blocks-*/**/*.js' block-name
// usage: find-block.js '*/blocks-*/**/*.js' suggest2-form__node

// todo: fix find block only, check rev deps, add tests

const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')
const parseBem = bemslug => require('bem-naming').parse(bemslug)

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

const hasPropWithNameVal = (node, name, val) => node.properties.filter(p => p.key.name === name && p.value.value === val).length

/**
 * @prop {String} globPattern
 * @prop {String} targetBlock
 * @prop {?String} targetElem
 */
const findBlock = module.exports = function findBlock(globPattern, targetBlock, targetElem) {
    findAstObjects(globPattern, node => {
        return hasPropWithNameVal(node, 'block', targetBlock)
            //&& (targetElem ? hasPropWithNameVal(node, 'elem', targetElem) : false)
    })
}

const bem = parseBem(process.argv[3])
module.parent || findBlock(globPattern, bem.block, bem.elem, bem.modName, bem.modVal)
