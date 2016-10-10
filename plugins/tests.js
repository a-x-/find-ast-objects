const testPlugin = require('./common/test')
const partial = require('lodash/partial')

// fixme: full test coverage
describe('plugins', () => {
    describe('bemxjst6', () => {
        describe('mods', () => {
            describe('theme', () => {
                const test = partial(testPlugin, require('./bemxjst6/find-none-theme-mod-blocks'))

                it('empty mods', () => test('theme.01.js', {}, true))
                it('w/o mods', () => test('theme.02.js', {}, true))
                it('with theme', () => test('theme.03.js', {}, false))
                it('not target block', () => test('theme.04.js', {}, false))
                it('mods variable', () => test('theme.05.js', {}, true))
                it('mods variable strict', () => test('theme.05.js', {level: 'error'}, false))
                it('block mods elem', () => test('theme.06.js', {}, true))
                it('block elem', () => test('theme.07.js', {}, false))
                it('block mods with theme elem', () => test('theme.08.js', {}, false))
                it('elem mods', () => test('theme.09.js', {}, false))
            })
        })

        describe('attrs', () => {
            describe('placeholder', () => {
                const test = partial(testPlugin, require('./bemxjst6/find-placeholder-attrs-errors'))

                it('empty', () => test('ph.01.js', {}, false))
                it('correct', () => test('ph.02.js', {}, false))
                it('attr', () => test('ph.03.js', {}, true))
            })
        })

        describe('misc', () => {
            describe('elem-mods', () => {
                const test = partial(testPlugin, require('./bemxjst6/find-elem-mods-warns'))

                it('warning', () => test('elem-mods.01.js', {}, true))
                it('correct', () => test('elem-mods.02.js', {}, false))
            })
        })
    })
})
