const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    info:{
        zipcode: {type: Number}, //agregarle maximo de longitud
        address: {
            number: {type: String},
            city: {type: String},
            street: {type: String}
        },
        phone: {type: Number}, // agregarle maximo de longitud, minimo
        dni: {type: Number} // agregarle maximo de longitud
    },
    creditCards:{type: Array},
    eMail: {type: String, required: true, unique: true},
    photo: {type: String}, // agregarle el default de la foto
    owner: {type: Boolean, default: false}, 
    admin: {type: Boolean, default: false},
    google: {type: Boolean, default: false}
})
const User = mongoose.model('user', userSchema)
module.exports = User