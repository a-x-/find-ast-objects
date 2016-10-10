const _ = require('lodash')
module.exports = function findElemModsWarns() {
    reutrn node => {
        if (_(node.properties).map('key.name').intersection(['elem', 'mods']).size() !== 2) return false
        if (_(node.properties).map('key.name').includes('elemMods')) return false
        return true
    }
}
