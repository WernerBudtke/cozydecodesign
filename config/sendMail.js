const transport = require('./transport')
async function wrapedSendMail(mailOptions){
    return new Promise((resolve,reject)=>{
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("error is "+error);
                resolve(false); 
            }else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        })
    })
}
module.exports = wrapedSendMail