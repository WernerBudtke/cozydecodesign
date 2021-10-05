const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true},
    orderNumber: {type: Number, required: true},
    products: [
        {
            productId: {type: mongoose.Types.ObjectId, ref: 'product'}, 
            quantity: {type: Number}
        }
    ],
    paymentMethod: {
        type: {type: String},
        extraInfo: {type: String} // puede ser algo q te de paypal o el final de la tarjet de credito
    },
    totalPrice: {type: Number, required: true},
    postedAt: {type: Date, default: Date.now}
})
const Order = mongoose.model('order', orderSchema)
module.exports = Order
