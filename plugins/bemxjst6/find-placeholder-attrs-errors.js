const _ = require('lodash')
require('../common/lodash-mixins')
const HasElemError = require('../common/find-elem')
const HasAttr = require('../common/find-attrs')

const target = 'placeholder'
const targetBlocks = [
    'input',
    'textinput',
    'textarea'
]

const hasAttr = new HasAttr(targetBlocks, target)
const hasElem = new HasElemError(target)

module.exports = function findPlaceholderErrors () {
    return node => {
        if (hasAttr(node) || hasElem(node)) return true
    }
}
