#!/usr/bin/env node
// env: VERBOSE
// usage: VERBOSE=1 node find-none-theme-mod-blocks.js | less
// usage: subl -n $(node find-none-theme-mod-blocks.js)

const globPattern = process.argv[2] || '*/blocks-*/**/*.js'
const themeDepsBlocks = [
    'link',
]
const targetMod = 'outer'

require('./find-mods-errors')(globPattern, themeDepsBlocks, targetMod, false)
