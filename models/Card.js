const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
    balance:{type: Number, min: 0, required: true},
    code: {type: Number, min: 0}
})
const Card = mongoose.model('card', cardSchema)
module.exports = Card
