// Crear Orden, Pedir x User / ALL (x fecha) + Send Mail after purchase
// Bajar el STOCK en X cantidad de los productos que compró y sumar X cantidad a los vendidos de cada producto.
const Order = require('../models/Order')
const orderControllers = {
    getOrders: async (req, res) => {
        console.log("Received GET ORDERS Petition:" + Date())
        try{
            const {filterBy} = req.body
            let willFilterFor = filterBy ? {...filterBy} : ''
            // console.log(willFilterFor)
            let orders = await Order.find({...willFilterFor})
            res.json({success: true, response: orders})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    getAnOrder: async (req, res) => {
        console.log("Received GET AN ORDER Petition:" + Date())
        try{
            const orderId = req.params.id
            let order = await Order.findOne({_id: orderId})
            if(!order)throw new Error('Order not found')
            res.json({success: true, response: order})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    newOrder: async (req, res) => {
        console.log("Received NEW ORDER Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            const user = req.session.loggedUser
            let numberOfOrders = await Order.count()
            const {products, paymentMethod, totalPrice} = req.body
            let newOrder = new Order({
                userId: user._id,
                orderNumber: parseInt(numberOfOrders) + 1,
                products,
                paymentMethod,
                totalPrice: parseFloat(totalPrice)
            })
            let savedOrder = await newOrder.save()
            res.json({success: true, response: savedOrder})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    modifyOrder: async (req, res) => {
        console.log("Received MODIFY ORDER Petition:" + Date())
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            if(!req.session.loggedUser.owner)throw new Error("You don't have permissions to do this")
            const orderId = req.params.id
            let modifiedOrder = await Order.findOneAndUpdate({_id: orderId}, {...req.body}, {new: true})
            if(!modifiedOrder)throw new Error('Order not found')
            res.json({success: true, response: modifiedOrder})
        }catch(err){
            res.json({success: false, response: err.message})
        }
    },
    deleteOrder: async (req, res) => {
        try{
            if(!req.session.loggedUser)throw new Error('Log In First')
            if(!req.session.loggedUser.owner)throw new Error("You don't have permissions to do this")
            const orderToDelete = req.params.id
            let orderDeleted = await Order.findOneAndDelete({_id: orderToDelete})
            if(!orderDeleted)throw new Error('order not found')
            res.json({success: true, response: orderDeleted})
        }catch(err){
            res.json({success: false, response: err.message})
        }  
    }
}
module.exports = orderControllers
//CRUD orderos