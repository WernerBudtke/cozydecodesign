import styles from "../styles/Product.module.css"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import ReactCircleModal from "react-circle-modal"
import Cart from "../components/Cart"
import CartCard from "../components/CartCard"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import ProductCard from "../components/ProductCard"
import Header from "../components/Header"

const Product = ({
  product,
  match,
  products,
  getProducts,
  findAProduct,
  addCartProduct,
  getProductByCategory,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [productAlert, setProductAlert] = useState(null)
  const [showCartCard, setShowCartCard] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    window.scroll(0, 0)
    if (!products.length) {
      getProducts().then((res) => {
        if (res.success) {
          findAProduct(match.params.id)
          getProductByCategory(product.category)
          setLoading(false)
        }
      })
    } else {
      getProductByCategory(product.category)
      findAProduct(match.params.id)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const editShowCartCard = (newState) => {
    setShowCartCard(newState)
  }

  const addToCartHandler = () => {
    setShowCartCard(true)
    let newProducts = {
      product: product,
      quantity: quantity,
    }
    setProductAlert(newProducts)
    addCartProduct(newProducts)
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

  if (productAlert) {
    setTimeout(() => {
      setProductAlert(null)
    }, 2500)
  }

  const finalPrice =
    product.discount === 0
      ? product.price
      : (((100 - product.discount) / 100) * product.price).toFixed(2)

  const photo = product.photo.includes("http")
    ? product.photo
    : `https://cozydeco.herokuapp.com/${product.photo}`

  const suggestions = products.filter(
    (obj) => obj._id !== product._id && obj.category === product.category
  )

  return (
    <>
      <Header />
      <div className={styles.productSection}>
        {productAlert && (
          <CartCard
            productAlert={productAlert}
            showCartCard={showCartCard}
            editShowCartCard={editShowCartCard}
          />
        )}

        <div className={styles.mainContainer}>
          <div
            className={styles.productImage}
            style={{ backgroundImage: `url("${photo}")` }}
          ></div>
          <div className={styles.productInfo}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div>
              {product.discount !== 0 && (
                <p className={product.discount !== 0 ? styles.sale : null}>
                  ${product.price}
                </p>
              )}
              <p className={styles.priceFinal}>${finalPrice}</p>
            </div>
            <div>
              <i className="far fa-credit-card fa-lg"></i>
              <p className={styles.interestCard}>
                3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}
              </p>
            </div>
            <div>
              <div className={styles.counter}>
                <i
                  className="fas fa-minus"
                  onClick={
                    quantity > 1 ? () => setQuantity(quantity - 1) : null
                  }
                ></i>
                <p>{quantity}</p>
                <i
                  className="fas fa-plus"
                  onClick={() => {
                    product.stock > quantity && product.category !== "GiftCard"
                      ? setQuantity(quantity + 1)
                      : setError("No Stock")
                  }}
                ></i>
              </div>
              <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <div className={styles.divError}>
              <p>{error}</p>
            </div>
            <div className={styles.shippingInfo}>
              <i className="fas fa-truck fa-lg"></i>
              <p>Free shipping on purchases from 200 dollars or more.</p>
            </div>
            <ReactCircleModal
              style={{
                padding: "0",
              }}
              backgroundColor="#61605e8a"
              toogleComponent={(onClick) => (
                <button
                  style={{
                    alignSelf: "center",
                  }}
                  onClick={onClick}
                >
                  Open Cart
                </button>
              )}
              offsetX={0}
              offsetY={0}
            >
              {(onClick) => <Cart onClickHandler={onClick} />}
            </ReactCircleModal>
          </div>
        </div>
        <div className={styles.suggestionContainer}>
          <h3>Related Products</h3>
          <div className={styles.suggestion}>
            {suggestions.map((obj) => {
              return (
                <div
                  onClick={() => setRefresh(!refresh)}
                  className={styles.productCardContainer}
                >
                  <ProductCard
                    setProductAlert={setProductAlert}
                    product={obj}
                    newClass={"newClass"}
                    editShowCartCard={editShowCartCard}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateTopProps = (state) => {
  return {
    product: state.products.product,
    products: state.products.products,
  }
}

const mapDispatchToProps = {
  findAProduct: productsActions.findAProduct,
  addCartProduct: cartActions.addCartProduct,
  getProductByCategory: productsActions.getProductByCategory,
  getProducts: productsActions.getProducts,
}
export default connect(mapStateTopProps, mapDispatchToProps)(Product)
