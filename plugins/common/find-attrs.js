const _ = require('lodash')
require('../common/lodash-mixins')
const hasAttr = require('../common/has-attr')

module.exports = function findAttrsErrors(targetBlocks, target) {
    return node => {
        if (!node.properties.filter(_.includes(themeDepsBlocks, p.value.value)).length) return false
        if (!_(node.properties).map('key.name').includes('attrs')) return false
        return hasAttr(target)
    }
}
