const estraverse = require('estraverse')

module.exports = (ast, onNode) => {
    const occurences = []
    return new Promise((res, rej) =>
        estraverse.traverse(ast, {
            enter: (node, parent) => {
                // console.log('enter');//todo tmp
                const result = onNode(node, parent)
                result !== undefined && occurences.push(result) // map item
                return result // manage traverse
            },
            onEnd: () => {
                // console.log('onEnd');//todo tmp
                res(occurences)
            }
        })
    )
}
