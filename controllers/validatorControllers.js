const joi = require('joi')
const validatorControllers ={
    validatorSignUp : (req, res, next) =>{
        const schema = joi.object({
            firstName: joi.string().trim().min(2).max(35).pattern(new RegExp('[^0-9]+$')).required(), 
            lastName: joi.string().trim().min(2).max(35).pattern(new RegExp('[^0-9]+$')).required(),
            eMail: joi.string().trim().min(6).max(255).email().required(),
            password: joi.string().alphanum().trim().min(4).max(255).required(),
            google: joi.boolean().required(),
            admin: joi.boolean().required(),
            secretWord: joi.string(),
            photo: joi.string(),
        })
        const validation = schema.validate(req.body, {abortEarly: false})
        if(!validation.error){
            next()
        }else{
            let validationStringified = validation.error.details.map(element => element.message).join(' ')
            res.json({success: false, response: validationStringified})
        }
    }
}
module.exports = validatorControllers