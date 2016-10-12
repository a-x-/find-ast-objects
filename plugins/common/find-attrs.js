const _ = require('lodash')
require('../common/lodash-mixins')
const hasAttr = require('../common/has-attr')
const getBlockName = require('./block-name')

module.exports = function findAttrsErrors(targetBlocks, target) {
    // @param {AcornESTreeNode} node
    // @see estree spec https://github.com/estree/estree
    return node => {
        if (!_.includes(targetBlocks, getBlockName(node))) return false
        if (!_(node.properties).map('key.name').includes('attrs')) return false
        return hasAttr(target)
    }
}
