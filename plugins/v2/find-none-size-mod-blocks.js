const themeDepsBlocks = [
    'button',
    'button2',
    'radiobox',
    'check-button',
]
const targetMod = 'size'

module.exports = function (opts) {
    return require('../common/find-mods')(themeDepsBlocks, targetMod, true, opts.level)
}
