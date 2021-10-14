const Product = require("../models/Product")
const productControllers = {
  getProducts: async (req, res) => {
    try {
      const { filterBy } = req.body
      let willFilterFor = filterBy ? { ...filterBy } : ""
      let products = await Product.find({ ...willFilterFor })
      res.json({ success: true, response: products })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  getAProduct: async (req, res) => {
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
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.admin) throw new Error("You don't have permissions to do this")
      if(!req.files)throw new Error('Must upload a photo')
      let photoUploaded = req.files.photo
      const {
        name,
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
        photo: "",
        stock: parseInt(stock),
        description,
        price: parseFloat(price),
        forSale,
        discount: parseInt(discount),
        category,
        subcategory,
      })
      let fileName = newProduct._id + "." + req.files.photo.name.split('.')[req.files.photo.name.split('.').length-1]
      newProduct.photo = fileName
      photoUploaded.mv(`${__dirname}/../storage/${fileName}`)
      let savedProduct = await newProduct.save()
      res.json({ success: true, response: savedProduct })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  modifyProduct: async (req, res) => {
    try {
      if (!req.session.loggedUser) throw new Error("Log In First")
      if (!req.session.loggedUser.admin)throw new Error("You don't have permissions to do this")
      const productId = req.params.id
      let photoUploaded = null
      let fileName = ""
      let whatToEdit = {}
      if(req.files){
        photoUploaded = req.files.photo
        fileName = productId + "." + req.files.photo.name.split('.')[req.files.photo.name.split('.').length-1]
        photoUploaded.mv(`${__dirname}/../storage/${fileName}`)
        whatToEdit = {...req.body, photo: fileName}
      }else{
        whatToEdit = {...req.body}
      }
      let modifiedProduct = await Product.findOneAndUpdate(
        { _id: productId },
        {...whatToEdit},
        { new: true }
      )
      if (!modifiedProduct) throw new Error("Product not found")
      res.json({ success: true, response: modifiedProduct })
    } catch (err) {
      res.json({ success: false, response: err.message })
    }
  },
  deleteProduct: async (req, res) => {
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
