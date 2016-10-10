const themeDepsBlocks = [
    'link',
]
const targetMod = 'outer'

module.exports = function (opts) {
    return require('../common/find-mods')(themeDepsBlocks, targetMod, true, opts.level)
}
