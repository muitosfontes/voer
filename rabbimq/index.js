const connection = require('./connection')
module.exports = {
    consumer: connection(ch => require('./consumers')(ch))
}