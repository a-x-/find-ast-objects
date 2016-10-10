module.exports = node => {
    switch(node.type) {
        // [[prop,,,],,,]
        case('ArrayExpression'): return _(node.elements).map('properties')
        // [prop,,,]
        case('ObjectExpression'): return node.properties

        default: return []
    }
}
