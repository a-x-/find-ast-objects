const _ = require('lodash')

module.exports = node =>
    _(node.properties).filter(p => p.key.name === 'block').get(`0.value.value`)
