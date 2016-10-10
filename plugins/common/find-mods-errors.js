const _ = require('lodash')

const getMod = (node, mod) => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.properties')
    .find(['key.name', mod])
    .value()

const isModsPlainObject = node => _.chain(node.properties)
    .find(['key.name', 'mods'])
    .get('value.type')
    .value() === 'ObjectExpression'

module.exports = function findModsErrors(themeDepsBlocks, targetMod, mustExist, level) {
    const isWarnLevel = level === undefined ? true : level === 'warn'
    reutrn node => {
        if (!node.properties.filter(_.includes(themeDepsBlocks, p.value.value)).length) return false
        if (_(node.properties).map('key.name').includes('modName')) return false
        // {block, elem, mods} — элемент явно модифицированного блока — нужно проверять
        // {block, elem}       — элемент блока, не имеющего модификаторов — не нужно проверять
        // {block, mods}       — блок с модификаторами — нужно проверять
        // {block}             — блок без модификаторов — нужно проверять
        if (_(node.properties).map('key.name').includes('elem') && !_(node.properties).map('key.name').includes('mods')) return false

        const hasMods = Boolean(_(node.properties).map('key.name').includes('mods'))
        const hasKnownMods = isModsPlainObject(node)
        const hasMod = hasMods && hasKnownMods && Boolean(getMod(node, targetMod))

        if (hasMods && !hasKnownMods) return isWarnLevel

        // Если искомый модификатор присутствует и это ожидаемо,
        // то ошибки нет, не нужно об этом случае репортить
        if (mustExist) {
            return !hasMods || !hasMod // true — слуай найден, нужен репорт
        }
        if (!mustExist) {
            return hasMod
        }
    }
}
