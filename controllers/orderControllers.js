// Crear Orden, Pedir x User / ALL (x fecha) + Send Mail after purchase
const Order = require("../models/Order")
const Product = require("../models/Product")
const wrapedSendMail = require("../config/sendMail")
const orderControllers = {
  getOrders: async (req, res) => {
    console.log("Received GET ORDERS Petition:" + Date())
    try {
      const { filterBy } = req.body
      let willFilterFor = filterBy ? { ...filterBy } : ""
      let orders = await Order.find({ ...willFilterFor })
      res.json({ success: true, response: orders })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  getAnOrder: async (req, res) => {
    console.log("Received GET AN ORDER Petition:" + Date())
    try {
      const orderId = req.params.id
      let order = await Order.findOne({ _id: orderId })
      if (!order) throw new Error("Order not found")
      res.json({ success: true, response: order })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  newOrder: async (req, res) => {
    console.log("Received NEW ORDER Petition:" + Date())
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      const user = req.session.loggedUser
      let numberOfOrders = await Order.count()
      const { products, paymentMethod, totalPrice } = req.body
      let newOrder = new Order({
        userId: user._id,
        orderNumber: parseInt(numberOfOrders) + 1,
        products,
        paymentMethod,
        totalPrice: parseFloat(totalPrice),
      })
      await newOrder.save()
      let productsBought = []
      productsBought = await Promise.all(products.map(async (product) => {
        let foundProduct = await Product.findOneAndUpdate(
          { _id: product.productId },
          { $inc: { stock: -product.quantity, sold: product.quantity } },
          {new: true}
        )
        return foundProduct
      }))
      let message = `
                    <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <div style="width: 100%;margin:20px 0; text-align: center;">
                            <img src="https://cozydeco.herokuapp.com/c.png" style="width: 100px;"/>
                        </div>
                        <tr>
                            <td style="background-color: #F0F3F5">
                                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                    <h1 style="color: #dabea8; margin: 0 0 7px">Hello!</h1>
                                    <h2 style="color: #000; margin: 0 0 7px">Dear ${user.firstName} ${user.lastName}:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000">
                                            We sent you this e-mail to let you know your purchase was successfully done<br>
                                    </p>
                                    <h2 style="color: #dabea8;">Details of your purchase:</h2>
                                        ${productsBought.map(product => {
                                        return (
                                          `<ul style="font-size: 15px;  margin: 10px 0">
                                            <li style="color: #000;">Name: ${product.name}</li>
                                            <li style="color: #000;">Price: ${product.discount > 0 ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2)}</li>
                                            <li style="color: #000;">Quantity: ${products.filter(element => element.productId == product._id)[0].quantity}</li>
                                          </ul>`
                                        )
                                      })}
                                    <h2 style="color: #dabea8;">Information about your purchase:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000">
                                        Bought with ${paymentMethod.type}
                                    </p>
                                    <ul style="font-size: 15px;  margin: 10px 0; color: #000">
                                        <li>Total price: ${totalPrice}</li>
                                    </ul>
                                    <h2 style="margin: 0 0 7px; color: #dabea8">Also:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000;">
                                        Have a good day and continue shopping anytime soon!
                                    </p>
                                    <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #dabea8;">
                                    <a style="text-decoration: none; color: white;" href=""><p style="color: #fff; font-size: 14px; text-align: center;">© Copyright 2021 | Cozy Deco.</p></a>	
                                </div>
                            </td>
                        </tr>
                    </table>
                `
      let mailOptions = {
        from: "Cozy <cozydecodesign@gmail.com>",
        to: `${user.firstName} <${user.eMail}>`,
        subject: `Thank you for your purchase ${user.firstName}!`,
        html: message,
      }
      let mailResp= await wrapedSendMail(mailOptions);
      if(!mailResp)throw new Error('Order creater, mail not sent')
      res.json({success: true, response: 'Order created, mail sent'})
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  modifyOrder: async (req, res) => {
    console.log("Received MODIFY ORDER Petition:" + Date())
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.owner)
        throw new Error("You don't have permissions to do this")
      const orderId = req.params.id
      let modifiedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { ...req.body },
        { new: true }
      )
      if (!modifiedOrder) throw new Error("Order not found")
      res.json({ success: true, response: modifiedOrder })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  deleteOrder: async (req, res) => {
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.owner)
        throw new Error("You don't have permissions to do this")
      const orderToDelete = req.params.id
      let orderDeleted = await Order.findOneAndDelete({ _id: orderToDelete })
      if (!orderDeleted) throw new Error("order not found")
      res.json({ success: true, response: orderDeleted })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
}
module.exports = orderControllers
