const Product = require("../models/Product")
const productControllers = {
  getProducts: async (req, res) => {
    console.log("Received GET PRODUCTS Petition:" + Date())
    try {
      const { filterBy } = req.body
      let willFilterFor = filterBy ? { ...filterBy } : ""
      // console.log(willFilterFor)
      let products = await Product.find({ ...willFilterFor })
      res.json({ success: true, response: products })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  getAProduct: async (req, res) => {
    console.log("Received GET A PRODUCT Petition:" + Date())
    try {
      const productId = req.params.id
      let product = await Product.findOne({ _id: productId })
      if (!product) throw new Error("Product not found")
      res.json({ success: true, response: product })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  addProduct: async (req, res) => {
    console.log("Received ADD PRODUCT Petition:" + Date())
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.admin)
        throw new Error("You don't have permissions to do this")
      const {
        name,
        photo,
        stock,
        description,
        price,
        forSale,
        discount,
        category,
        subcategory,
      } = req.body
      let newProduct = new Product({
        name,
        photo,
        stock: parseInt(stock),
        description,
        price: parseFloat(price),
        forSale: forSale == "true",
        discount: parseInt(discount),
        category,
        subcategory,
      })
      let savedProduct = await newProduct.save()
      res.json({ success: true, response: savedProduct })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  modifyProduct: async (req, res) => {
    console.log("Received MODIFY PRODUCT Petition:" + Date())
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.admin)
        throw new Error("You don't have permissions to do this")
      const productId = req.params.id
      let modifiedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { ...req.body },
        { new: true }
      )
      if (!modifiedProduct) throw new Error("Product not found")
      res.json({ success: true, response: modifiedProduct })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  deleteProduct: async (req, res) => {
    console.log("Received DELETE PRODUCT Petition:" + Date())
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.owner)
        throw new Error("You don't have permissions to do this")
      const productToDelete = req.params.id
      let productDeleted = await Product.findOneAndDelete({
        _id: productToDelete,
      })
      if (!productDeleted) throw new Error("Product not found")
      res.json({ success: true, response: productDeleted })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
}
module.exports = productControllers
//CRUD productos
//para que  el borrar productos borrar console.llog
