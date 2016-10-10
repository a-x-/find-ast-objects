const Glob = require('glob')
const glob = (glob, each) =>
    Glob(glob, (err, files) => files && files.filter(file => file).map(each))

module.exports = (globPattern, onFile) => {
    const occurences = []
    return new Promise((res, rej) =>
        glob(globPattern, file => {
            const result = onFile(file)
            result !== undefined && occurences.push(result)
        })
        .on('end', () => res(occurences))
        .on('error', e => rej(e || 'glob internal error'))
    )
}
