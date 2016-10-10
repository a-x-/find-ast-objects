const _ = require('lodash')
const getBlockName = require('./block-name')

const getMod = (node, mod) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.properties')
    .find(['key.name', mod])
    .value()

const isModsPlainObject = node => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.type')
    .value() === 'ObjectExpression'

module.exports = function findModsErrors(targetBlocks, targetMod, mustExist, level) {
    const isWarnLevel = level === undefined ? true : level === 'warn'
    return node => {
        if (!_.includes(targetBlocks, getBlockName(node))) return false
        if (_(node.properties).map('key.name').includes('modName')) return false
        // {block, mods, elem} — элемент явно модифицированного блока — нужно проверять
        // {block, elem}       — элемент блока, не имеющего модификаторов — не нужно проверять
        // {block, mods}       — блок с модификаторами — нужно проверять
        // {block}             — блок без модификаторов — нужно проверять
        if (_(node.properties).map('key.name').includes('elem') && !_(node.properties).map('key.name').includes('mods')) return false

        const hasModsObj = Boolean(_(node.properties).map('key.name').includes('mods'))
        const hasKnownMods = isModsPlainObject(node)
        const hasMod = hasModsObj && hasKnownMods && Boolean(getMod(node, targetMod))

        if (hasModsObj && !hasKnownMods) return isWarnLevel

        // Если искомый модификатор присутствует и это ожидаемо,
        // то ошибки нет, не нужно об этом случае репортить
        return mustExist !== hasMod // true — слуай найден, нужен репорт
    }
}
