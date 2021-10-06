const joi = require("joi")
const validatorControllers = {
  validatorSignUp: (req, res, next) => {
    const schema = joi.object({
      firstName: joi.string().trim().min(2).max(35).pattern(new RegExp("[^0-9]+$")).required().messages({
          "string.empty": "Firstname field cant be empty",
          "string.min": "Firstname must contain at least 2 characters",
          "string.max": "Firstanme cannot exceed 25 characters",
      }),
      lastName: joi.string().trim().min(2).max(35).pattern(new RegExp("[^0-9]+$")).required().messages({
          "string.empty": "Lastname field cant be empty",
          "string.min": "Lastname must contain at least 2 characters",
          "string.max": "Lastname cannot exceed 25 characters",
      }),
      eMail: joi.string().trim().min(6).max(255).email().required().messages({
        "string.empty": "Email cant be empty",
        "string.base": "The email must be of type text",
        "string.email": "The email is invalid",
      }),
      password: joi.string().alphanum().trim().min(4).max(255).required().messages({
          "string.empty": "The password field cant be empty",
          "string.base": "The password must be of type text",
          "string.min": "Password must contain at least 8 characters",
      }),
      google: joi.boolean().required(),
      admin: joi.boolean().required(),
      secretWord: joi.string(),
      photo: joi.string(),
    })
    const validation = schema.validate(req.body, { abortEarly: false })
    if (!validation.error) {
      next()
    } else {
      res.json({
        response: validation.error.details.map((error) => {
          return { field: error.context.key, message: error.message }
        }),
      })
    }
  },
}
module.exports = validatorControllers