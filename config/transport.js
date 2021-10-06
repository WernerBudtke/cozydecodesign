const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    port: 465,
    host:'smtp.gmail.com',
    auth:{
        user: process.env.MAILUSERNAME,
        pass: process.env.MAILPASSWORD
    },
    tls: {rejectUnauthorized: false}
})
module.exports = transport