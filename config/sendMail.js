const transport = require('./transport')
async function wrapedSendMail(mailOptions){
    return new Promise((resolve,reject)=>{
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                resolve(false); 
            }else {
                resolve(true);
            }
        })
    })
}
module.exports = wrapedSendMail