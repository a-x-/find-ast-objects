#!/usr/bin/env node
// env: VERBOSE=1
// env: LEVEL=warn|error — warn: сообщать обо всём, error: сообщать только если уверен
// usage: VERBOSE=1 node find-mods-errors.js | less
// usage: subl -n $(node find-mods-errors.js)

// todo: add levels: err | warn (mods:mods)
const _ = require('lodash')
const findAstObjects = require('../find-ast-objects')

const getMod = (node, mod) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.properties')
    .find(['key.name', mod])
    .value()

const isModsPlainObject = (node) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.type')
    .value() === 'ObjectExpression'

const LEVEL = process.env.LEVEL

module.exports = function findModsErrors(globPattern, themeDepsBlocks, targetMod, mustExist, level) {
    level = LEVEL || level
    const isWarnLevel = level === undefined ? true : level === 'warn'
    findAstObjects(globPattern, node => {
        if (!node.properties.filter(p => p.key.name === 'block' && _.includes(themeDepsBlocks, p.value.value)).length) return false
        if (_(node.properties).map('key.name').includes('modName')) return false
        // {block, elem, mods} — элемент явно модифицированного блока — нужно проверять
        // {block, elem}       — элемент блока, не имеющего модификаторов — не нужно проверять
        // {block, mods}       — блок с модификаторами — нужно проверять
        // {block}             — блок без модификаторов — нужно проверять
        if (_(node.properties).map('key.name').includes('elem') && !_(node.properties).map('key.name').includes('mods')) return false

        const hasMods = Boolean(_(node.properties).map('key.name').includes('mods'))
        const hasKnownMods = isModsPlainObject(node)
        // console.log('wtf', hasKnownMods);
        const hasMod = hasMods && hasKnownMods && Boolean(getMod(node, targetMod))

        if (!hasKnownMods) return isWarnLevel

        // Если искомый модификатор присутствует и это ожидаемо,
        // то ошибки нет, не нужно об этом случае репортить
        if (mustExist) {
            return !hasMods || !hasMod // true — слуай найден, нужен репорт
        }
        if (!mustExist) {
            return hasMod
        }
    })
}
