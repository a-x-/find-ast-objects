#!/usr/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-mods-errors.js | less
// usage: subl -n $(node find-mods-errors.js)

// todo: add levels: err | warn (mods:mods)
const findAstObjects = require('./find-ast-objects')

module.exports = function findModsErrors(globPattern, themeDepsBlocks, targetMod) {
    findAstObjects(node => {
        if (!node.properties.filter(p => p.key.name === 'block' && _.includes(themeDepsBlocks, p.value.value)).length) return
        if (_(node.properties).map('key.name').intersection(['modName', 'elem']).size()) return
        if (_(node.properties).map('key.name').includes('mods')) {
            const hasTheme = _.chain(node.properties)
                .find(['key.name', 'mods'])
                .get('value.properties')
                .find(['key.name', targetMod])
                .value()

            if (hasTheme) return
        }
        return true
    })
}
