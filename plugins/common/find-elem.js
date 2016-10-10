const normalizeAstProperties = require('./ast-array-object-normalize')

module.exports = function findElem(target) {
    reutrn node => {
        if (!_(node.properties).map('key.name').includes('content')) return false

        const content = _.chain(node.properties).findKeyVal('key.name', 'content').get('value')
        const properties = normalizeAstProperties(content)

        return _.chain(properties).findKeyVal('key.name', 'elem').get('value.value') === target
    }
}