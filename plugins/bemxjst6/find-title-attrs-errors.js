const target = 'title'
const targetBlocks = [
    'button',
    'button2',
    'link',
]

module.exports = function findTitleAttrsErrors () {
    return require('../common/find-attrs')(targetBlocks, target)
}
