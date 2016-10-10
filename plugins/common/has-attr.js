const _ = require('lodash')

module.exports = (node, attr) => _.chain(node.properties)
    .findKeyVal('key.name', 'attrs')
    .get('value.properties')
    .findKeyVal('key.name', attr)
    .value()
