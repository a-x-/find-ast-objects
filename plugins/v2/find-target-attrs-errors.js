const target = 'target'
const targetBlocks = [
    'button',
    'button2',
    'link',
]

module.exports = function findTargetAttrsErrors () {
    return require('../common/find-attrs')(targetBlocks, target)
}
