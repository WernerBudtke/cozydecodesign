const joi = require("joi")
const validatorControllers = {
  validatorSignUp: (req, res, next) => {
    const schema = joi.object({
      firstName: joi.string().trim().min(2).max(35).pattern(new RegExp("[^0-9]+$")).required().messages({
        'string.empty': 'Firstname cant be empty',
        'string.min': 'Firstname must contain at least two characters', 
        "string.max": 'Firstname cannot exceed 35 characters', 
        "string.pattern.base": 'Firstname cannot contain numbers'
      }),
      lastName: joi.string().trim().min(2).max(35).pattern(new RegExp("[^0-9]+$")).required().messages({
        'string.empty': 'Lastname cant be empty',
        'string.min': 'Lastname must contain at least two characters',
        "string.max": 'Lastname cannot exceed 35 characters ',
        "string.pattern.base": 'Lastname cannot contain numbers'
      }),
      eMail: joi.string().trim().min(6).max(255).email().required().messages({
        'string.empty': 'Email cant be empty',
        'string.base': 'The email must be of type text',
        'string.min': 'Email lenght must be at least 6 characters long',
        'string.email': 'The email is invalid',
      }),
      password: joi.string().alphanum().trim().min(6).max(255).required().messages({
        'string.empty': 'The field cant be empty',
        'string.base': 'The password must be of type text',
        'string.min': 'Password must contain at least six characters',
      }),
      google: joi.boolean().required(),
      admin: joi.boolean().required(),
      secretWord: joi.string(),
      photo: joi.string(),
    })
    const validation = schema.validate(req.body, {abortEarly: false})
      if(!validation.error){
          next()
      }else{
          console.log(validation.error.details)
          res.json({ success: false, response: validation.error.details})
      }
  },
}
module.exports = validatorControllers