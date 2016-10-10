const themeDepsBlocks = [
    'button',
    'button2',
    'check-button',
    'link',
    'radio-button',
    'radiobox',
    'tabs',
    'tumbler',
]
const targetMod = 'theme'
module.exports = function (opts) {
    return require('../common/find-mods')(themeDepsBlocks, targetMod, true, opts.level)
}
