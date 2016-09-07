#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-elem-mods-warns.js | less
// usage: subl -n $(node find-elem-mods-warns.js)
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const globPattern = '*/blocks-*/**/*.js'

const findElemModsWarns = module.exports = function findElemModsWarns(globPattern) {
    findAstObjects(globPattern, node => {
        if (_(node.properties).map('key.name').intersection(['elem', 'mods']).size() !== 2) return false
        if (_(node.properties).map('key.name').includes('elemMods')) return false
        return true
    })
}

module.parent || findElemModsWarns(globPattern)
