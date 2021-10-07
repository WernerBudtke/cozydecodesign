import styles from "../styles/Product.module.css"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { useEffect, useState } from "react"
import ReactCircleModal from "react-circle-modal"
import Cart from "../components/Cart"
import cartActions from "../redux/actions/cartActions"

const Product = ({
  getAProduct,
  product,
  match,
  products,
  findAProduct,
  addCartProduct,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!products.length) {
      getAProduct(match.params.id).then((res) => {
        if (!res.success) {
          console.log(res)
        } else {
          setLoading(false)
        }
      })
    } else {
      findAProduct(match.params.id)
      setLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addToCartHandler = () => {
    console.log("voy a la action")
    let newProducts = {
      // productId: product,
      product: product,
      quantity: quantity,
    }
    addCartProduct(newProducts)
  }

  if (loading) {
    return <h1>LOADING...</h1>
  }
  const finalPrice =
    product.discount === 0
      ? product.price
      : (((100 - product.discount) / 100) * product.price).toFixed(2)

  return (
    <div className={styles.productSection}>
      <div className={styles.mainContainer}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url("${product.photo}")` }}
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
            <p>${finalPrice}</p>
          </div>
          <div>
            <i className="far fa-credit-card fa-2x"></i>
            <p>3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}</p>
          </div>
          <div>
            <div className={styles.counter}>
              <i
                className="fas fa-minus"
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
              ></i>
              <p>{quantity}</p>
              <i
                className="fas fa-plus"
                onClick={() => {
                  product.stock === quantity
                    ? alert("no hay stock")
                    : setQuantity(quantity + 1)
                }}
              ></i>
            </div>
            <button onClick={addToCartHandler}>Add to Cart</button>
          </div>
          <div className={styles.shippingInfo}>
            <i className="fas fa-truck fa-2x"></i>
            <p>Free shipping on purchases from 200 dollars or more</p>
          </div>
          <p>calculo de envio - CP</p>
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
            // Optional fields and their default values
            offsetX={0}
            offsetY={0}
          >
            {(onClick) => <Cart onClickHandler={onClick} />}
          </ReactCircleModal>
        </div>
      </div>
      <div className={styles.suggestion}></div>
    </div>
  )
}

const mapStateTopProps = (state) => {
  return {
    product: state.products.product,
    products: state.products.products,
  }
}

const mapDispatchToProps = {
  getAProduct: productsActions.getAProduct,
  findAProduct: productsActions.findAProduct,
  addCartProduct: cartActions.addCartProduct,
}
export default connect(mapStateTopProps, mapDispatchToProps)(Product)
