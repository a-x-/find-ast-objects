const test = require('./common/test')
const partial = require('lodash/partial')

describe('plugins', () => {
    describe('mods', () => {
        describe('theme', () => {
            const testTheme = partial(test, require('./v2/find-none-theme-mod-blocks'))

            it('empty mods', () => testTheme('theme.01.js', {}, true))
            it('w/o mods', () => testTheme('theme.02.js', {}, true))
            it('with theme', () => testTheme('theme.03.js', {}, false))
            it('not target object', () => testTheme('theme.04.js', {}, false))
            it('mods variable', () => testTheme('theme.05.js', {}, true))
            it('mods variable strict', () => testTheme('theme.05.js', {level: 'error'}, false))
            it('block mods elem', () => testTheme('theme.06.js', {}, true))
            it('block elem', () => testTheme('theme.07.js', {}, false))
            it('block mods with theme elem', () => testTheme('theme.08.js', {}, false))
            it('elem mods', () => testTheme('theme.09.js', {}, false))
        })
    })
})
