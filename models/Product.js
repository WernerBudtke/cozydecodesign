const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String, required: true},
    stock: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    forSale: {type: Boolean},
    discount: {type: Number, default: null},
    category: {type: String, required: true},
    subcategory: {type: String, required: true},
    sold: {type: Number, default: 0},
})
const Product = mongoose.model('product', productSchema)
module.exports = Product