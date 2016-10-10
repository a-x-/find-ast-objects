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

module.exports = () => require('./common/find-mods-errors')(themeDepsBlocks, targetMod, true)
