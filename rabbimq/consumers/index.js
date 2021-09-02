const send = require('./send')
module.exports = (ch) => [send].forEach(callback => {
    callback(ch)
})