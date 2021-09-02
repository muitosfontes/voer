const amqp = require('amqplib/callback_api');
module.exports = (callback) => {
    amqp.connect('amqp://host.docker.internal:7300', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            callback(channel)
        })
    })
}