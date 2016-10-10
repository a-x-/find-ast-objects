const _ = require('lodash')

module.exports = function findBlock(target) {
    return node => {
        return node.properties.filter(p => p.key.name === 'block' && p.value.value === target).length
    }
}
