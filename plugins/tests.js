const assert = require('assert');
const color = require('chalk');
const parse = require('acorn');
const _ = require('lodash');
const childProcess = require('child_process')

function debug(message) {
    var log = console.log.bind(console, color.blue('debug> ') + message);
    log.apply(null, Array.from(arguments).splice(1))
}

/*
_________ _______  _______ _________ _______
\__   __/(  ____ \(  ____ \\__   __/(  ____ \
   ) (   | (    \/| (    \/   ) (   | (    \/
   | |   | (__    | (_____    | |   | (_____
   | |   |  __)   (_____  )   | |   (_____  )
   | |   | (            ) |   | |         ) |
   | |   | (____/\/\____) |   | |   /\____) |
   )_(   (_______/\_______)   )_(   \_______)
*/

function test(plugin, file, expectedResult) {
    console.log('run test ' + plugin + ' for file', color.black.bold(file))
    var output = childProcess.execSync(`${plugin} ${file}`, {encoding:'utf8'})
    console.log('output:', output)
    assert.ok(expectedResult === Boolean(output.trim()), (expectedResult ? 'cases are catched' : 'cases are not found' + '. Test:' + plugin + ' ' + file))
}

console.log(color.green('Run tests...'))

Promise.resolve()
.then(()=>test('node ./tests/check-tests.js', '', true))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.1.js', true))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.2.js', true))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.3.js', false))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.4.js', false))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.5.js', true))
.then(()=>test('LEVEL=error find-none-theme-mod-blocks.js', 'tests/theme.5.js', false))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.6.js', true))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.7.js', false))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.8.js', false))
.then(()=>test('find-none-theme-mod-blocks.js', 'tests/theme.9.js', false))
.then(()=>debug(color.green('OK: All tests passed!')))
.catch(e=>debug(color.red('err>'), e))
