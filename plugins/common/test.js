if(typeof it === 'undefined') {
    console.log('run: mocha ' + require('path').basename(process.argv[1]));
    process.exit();
}

const findAstObjects = require('../../find-ast-objects')
const sinon = require('sinon')
const assert = require('assert')
const _ = require('lodash')
const isBlock = node => !!node.properties.filter(p => p.key.name === 'block').length

module.exports = function test(Plugin, file, opts, expectedResult) {
    const plugin = new Plugin(opts)
    const spy = sinon.spy()
    const path = `${__dirname}/../test-assets/${file}`
    return findAstObjects(path, node => {
        spy()
        if (!isBlock(node)) return
        const result = plugin(node)
        return result
    })
    .catch((e) => assert.ok(false, 'findAstObjects internal error\n' + e.stack))
    .then(occurences => {
        const flat = _.flattenDeep(occurences);
        assert.deepEqual(!!flat.length, expectedResult, 'in snippet:\n'+JSON.stringify(flat[0]&&flat[0].snippet||occurences))
    })
    .then(() => assert.ok(spy.called, 'called'))
}
