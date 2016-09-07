#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-none-theme-mod-blocks.js | less
// usage: subl -n $(node find-none-theme-mod-blocks.js)

const globPattern = '*/blocks-*/**/*.js'
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

require('./find-mods-errors')(globPattern, themeDepsBlocks, targetMod)
