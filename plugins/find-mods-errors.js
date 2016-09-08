#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-mods-errors.js | less
// usage: subl -n $(node find-mods-errors.js)

// todo: add levels: err | warn (mods:mods)
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const getMod = (node, mod) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.properties')
    .find(['key.name', mod])
    .value()

module.exports = function findModsErrors(globPattern, themeDepsBlocks, targetMod, mustExist) {
    findAstObjects(globPattern, node => {
        if (!node.properties.filter(p => p.key.name === 'block' && _.includes(themeDepsBlocks, p.value.value)).length) return false
        if (_(node.properties).map('key.name').intersection(['modName', 'elem']).size()) return false

        const hasMods = Boolean(_(node.properties).map('key.name').includes('mods'))
        const hasMod = hasMods && Boolean(getMod(node, targetMod))

        // Если искомый модификатор присутствует и это ожидаемо,
        // то ошибки нет, не нужно об этом случае репортить
        if (mustExist) {
            return !hasMods || !hasMod // true — слуай найден, нужен репорт
        }
        if (!mustExist) {
            return hasMod
        }
    })
}
