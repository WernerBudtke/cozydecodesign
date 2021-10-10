// Crear Orden, Pedir x User / ALL (x fecha) + Send Mail after purchase
const Order = require("../models/Order")
const Product = require("../models/Product")
const transport = require("../config/transport")
const orderControllers = {
  getOrders: async (req, res) => {
    console.log("Received GET ORDERS Petition:" + Date())
    try {
      const { filterBy } = req.body
      let willFilterFor = filterBy ? { ...filterBy } : ""
      // console.log(willFilterFor)
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
      let savedOrder = await newOrder.save()
      products.forEach(async (product) => {
        await Product.findOneAndUpdate(
          { _id: product.productId },
          { $inc: { stock: -product.quantity, sold: product.quantity } }
        )
      })
      let message = `
                    <table style="max-width: 700px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                        <div style="width: 100%;margin:20px 0; text-align: center;">
                            <img src="https://i.postimg.cc/s2Z5nX3q/logo.png" />
                        </div>
                        <tr>
                            <td style="background-color: #F0F3F5">
                                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                                    <h1 style="color: #19b1bc; margin: 0 0 7px">Hello!</h1>
                                    <h2 style="color: #000; margin: 0 0 7px">Dear ${user.firstName} ${user.lastName}:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000">
                                            We sent you this e-mail to let you know your purchase was successfully done<br>
                                    </p>
                                    <h2 style="color: #19b1bc;">Details of your Purchase(products):</h2>
                                    <ul style="font-size: 15px;  margin: 10px 0">
                                        ${savedOrder.products.map(product => product)}
                                        <li style="color: #000;"></li>
                                        <li style="color: #000;">Products: ${user.lastName}</li>
                                        <li style="color: #000;">Email: ${user.eMail}</li>
                                        <a href="https://cozydecodesign.herokuapp.com/user/resetpassword/${user._id}" style="font-size:25px;color: #000;text-align:center;display:block;">CHANGE YOUR PASSWORD!</a>
                                    </ul>
                                    <h2 style="color: #19b1bc;">IMPORTANT INFORMATION - PROTECT YOUR ACCOUNT:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000">
                                        Our website encrypt your password to protect your information, but even if we do that, is your responsability to protect your account using a secure password, here are some tips to do so:
                                    </p>
                                    <ul style="font-size: 15px;  margin: 10px 0; color: #000">
                                        <li>Use non easy to guess combinations (for example don't use birthdays)</li>
                                        <li>Use symbols, numbers and / or uppercase letters.</li>
                                        <li>Don't tell anyone your password.</li>
                                        <li>NO ONE will ask from this company your password to assist you.</li>
                                    </ul>
                                    <h2 style="margin: 0 0 7px; color: #19b1bc">Also:</h2>
                                    <p style="margin: 2px; font-size: 15px; color: #000;">
                                        If you didn't request a password change, dismiss this email.
                                    </p>
                                    <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center; background-color: #19b1bc;">
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
      transport.sendMail(mailOptions, (err, data) => {
        if(err){
          throw new Error('Order placed, mail not sent')
        }else{
          res.json({ success: true, response: data })
        }
      })
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
