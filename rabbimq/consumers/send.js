const routingKey = 'e-mail.send';
module.exports = (ch) => 
    ch.assertQueue(
        'e-mail', {
            durable: true,
            deadLetterExchange: 'dead-letter',
            deadLetterRoutingKey: 'dead-letter.send',
            messageTtl: 5000
        }, (error1, q) => { 
            if (error1) {
                throw  error1;
            }
            ch.bindQueue(
                q.queue, 
                'amq.topic', 
                routingKey
            );
            ch.consume(
                q.queue, 
                (msg) => {
                    console.log(msg)
                    ch.reject(msg, true);
                }, {
                    noAck: false
                }
            );
        }
    )

// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: false
// });
// let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', 
//     to: "bar@example.com, baz@example.com", 
//     subject: "Hello ✔", 
//     text: "Hello world?", 
//     html: "<b>Hello world?</b>", 
// });
// console.log("Message sent: %s", info.messageId);
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));