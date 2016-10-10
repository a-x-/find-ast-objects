const _ = require('lodash')

_.mixin({
    findKeyVal: (path, val) => _.find([path, val])
})
