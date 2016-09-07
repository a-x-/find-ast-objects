#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-elem-mods-warns.js | less
// usage: subl -n $(node find-elem-mods-warns.js)
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const globPattern = process.argv[2] || '*/blocks-*/**/*.js'

const findElemModsWarns = module.exports = function findElemModsWarns(globPattern) {
    findAstObjects(globPattern, node => {
        if (!_(node.properties).map('key.name').intersection(['attrs', 'content']).size()) return false
        if (_(node.properties).map('key.name').includes('placeholder')) return false

        const hasAttrsTarget = _.chain(node.properties)
            .find(['key.name', 'attrs'])
            .get('value.properties')
            .find(['key.name', 'placeholder'])
            .value()

        if (hasAttrsTarget) return true

        const content = _.chain(node.properties).find(['key.name', 'content']).get('value')
        if (content.type === 'ArrayExpression') {
            if (_.chain(content.elements).map('properties').find(['key.name', 'elem']).get('value.value') === 'hint') return true
        }
        if (content.type === 'ObjectExpression') {
            if (_.chain(content.properties).find(['key.name', 'elem']).get('value.value') === 'hint') return true
        }

        return false
    })
}

module.parent || findElemModsWarns(globPattern)
