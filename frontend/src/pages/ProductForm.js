import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/ProductForm.module.css"
import { useHistory } from "react-router"
import Header from "../components/Header"

const ProductForm = ({
  addProduct,
  modifyProduct,
  findAProduct,
  match,
  product,
  getProducts,
}) => {
  var productId = match.params.id
  const [loading, setLoading] = useState(true)
  const [emptyFields, setEmptyFields] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    photo: null,
    stock: "",
    description: "",
    price: "",
    forSale: "",
    discount: "",
    category: "",
    subcategory: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    findAProduct(productId)
    if(!productId){
      setNewProduct({
        name: "",
        photo: null,
        stock: "",
        description: "",
        price: "",
        forSale: "",
        discount: "",
        category: "",
        subcategory: "",
      })
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (product) {
      refreshNewProduct()
      setLoading(false)
    }
  }, [product])

  const refreshNewProduct = () => {
    setNewProduct({
      name: product.name,
      photo: product.photo,
      stock: product.stock,
      description: product.description,
      price: product.price,
      forSale: product.forSale,
      discount: product.discount,
      category: product.category,
      subcategory: product.subcategory,
    })
  }

  var subcategories = []
  let history = useHistory()

  if (newProduct.category === "Bathroom") {
    subcategories = ["Accesories", "Mirrors"]
  } else if (newProduct.category === "Kitchenware") {
    subcategories = ["Accesories", "Glassware", "Tableware"]
  } else if (newProduct.category === "Decor") {
    subcategories = ["Accesories", "Home", "Lighting"]
  } else if (newProduct.category === "GiftCard") {
    subcategories = ["GiftCard"]
  }
  const categories = ["Bathroom", "Kitchenware", "Decor", "GiftCard"]

  const inputHandler = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    })
  }

  const submitForm = async () => {
    const fd = new FormData()
    fd.append("name", newProduct.name)
    fd.append("photo", newProduct.photo)
    fd.append("stock", newProduct.stock)
    fd.append("description", newProduct.description)
    fd.append("price", newProduct.price)
    fd.append("forSale", newProduct.forSale)
    fd.append("category", newProduct.category)
    fd.append("subcategory", newProduct.subcategory)
    fd.append("discount", newProduct.discount)
    let empty = Object.values(newProduct).some((value) => value === "" || typeof value === "undefined")
    if (empty) {
      setEmptyFields(true)
    } else {
      const response = await addProduct(fd)
      if (response.data.success) {
        await getProducts()
        setEmptyFields(false)
        history.push('/products')
        return false
      } else {
        alert("Todo salió mal!")
      }
    }
  }

  const editProduct = async () => {
    const fd = new FormData()
    fd.append("name", newProduct.name)
    fd.append("photo", newProduct.photo)
    fd.append("stock", newProduct.stock)
    fd.append("description", newProduct.description)
    fd.append("price", newProduct.price)
    fd.append("forSale", newProduct.forSale)
    fd.append("category", newProduct.category)
    fd.append("subcategory", newProduct.subcategory)
    fd.append("discount", newProduct.discount)
    let empty = Object.values(newProduct).some((value) => value === "")
    if (empty) {
      alert("complete all the fields")
    } else {
      let response = await modifyProduct(productId, fd)
      if (response.success) {
        let res = await getProducts()
        console.log("antes de pushear")
        console.log(res)
        if (res.success) {
          history.push("/products")
        }
        return false
      } else {
        alert("Todo salió mal!")
      }
    }
  }

  if (loading) {
    return (
      <>
        <div className={styles.productsGallery}>
          <div className="loader">
            <div style={{backgroundImage: `url("./assets/c.png")`}} className="preloaderImage"></div>
            <h1>LOADING...</h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <main
        calssName={styles.mainForm}
        style={{ backgroundImage: "/assets/home1.jpg" }}
      >
        <div className={styles.formContainer}>
          {productId ? <h4>Edit Product</h4> : <h4>New Product</h4>}
          <form className={styles.productForm}>
            <input
              type="text"
              onChange={inputHandler}
              name="name"
              placeholder="Name"
              autoComplete="nope"
              defaultValue={product?.name}
            />
            <div className={styles.picture}>
              <input
                type="file"
                onChange={inputHandler}
                name="photo"
                placeholder="Photo"
                autoComplete="nope"
              />
              {product &&
                <div
                  className={styles.productPic}
                  style={{ backgroundImage: `url(${product?.photo})` }}
                ></div>
              }
            </div>
            <textarea
              onChange={inputHandler}
              name="description"
              placeholder="Description"
              autoComplete="nope"
              defaultValue={productId ? product?.description : null}
            />
            <div className={styles.price}>
              <input
                type="number"
                onChange={inputHandler}
                name="stock"
                placeholder="Stock"
                autoComplete="nope"
                defaultValue={productId ? product?.stock : null}
              />
              <input
                type="number"
                onChange={inputHandler}
                name="price"
                placeholder="Price"
                autoComplete="nope"
                defaultValue={productId ? product?.price : null}
              />
            </div>
            <div className={styles.saleInput}>
              <div className={styles.saleRadios}>
                <p>For Sale</p>
                <input
                  type="radio"
                  id="true"
                  name="forSale"
                  onChange={inputHandler}
                  defaultValue={productId ? product?.forSale : "true"}
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  id="false"
                  name="forSale"
                  onChange={inputHandler}
                  defaultValue={productId ? product?.forSale : "false"}
                />
                <label htmlFor="false">No</label>
              </div>
              <input
                type="number"
                onChange={inputHandler}
                name="discount"
                placeholder="Discount"
                autoComplete="nope"
                defaultValue={productId ? product?.discount : null}
              />
            </div>
            <select
              name="category"
              onChange={inputHandler}
              placeholder="Category"
              defaultValue={productId ? product?.category : null}
            >
              <option>Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              name="subcategory"
              onChange={inputHandler}
              placeholder="Subcategory"
              defaultValue={productId ? product?.subcategory : null}
            >
              <option>Subcategory</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </form>
          {emptyFields && <p className={styles.textError}>Complete all fields!</p>}
          <button
            className={styles.formButton}
            onClick={productId ? () => editProduct() : () => submitForm()}
          >
            Send
          </button>
        </div>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
  }
}

const mapDispatchToProps = {
  addProduct: productsActions.addProduct,
  findAProduct: productsActions.findAProduct,
  modifyProduct: productsActions.modifyProduct,
  getProducts: productsActions.getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
