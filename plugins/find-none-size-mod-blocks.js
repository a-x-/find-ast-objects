#!/usr/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-none-theme-link-blocks.js | less
// usage: subl -n $(node find-none-theme-link-blocks.js)

const globPattern = '*/blocks-*/**/*.js'
const themeDepsBlocks = [
    'button',
    'button2',
    'radiobox',
]
const targetMod = 'size'

require('./find-mods-errors')(globPattern, themeDepsBlocks, targetMod)