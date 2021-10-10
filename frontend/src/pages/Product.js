import styles from "../styles/Product.module.css"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import ReactCircleModal from "react-circle-modal"
import Cart from "../components/Cart"
import CartCard from "../components/CartCard"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"

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
  const [productAlert, setProductAlert] = useState(null)
  const [showCartCard, setShowCartCard] = useState(false) 

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

  console.log(products)

  products.map((prod) => {
    // let prodcateg = prod.category
    let coincidencia = products.category === prod.category
    return (
      // (prodcateg.map((categ) => {
      //   return (
         console.log(coincidencia)
        // )
      // })
      )
    // )
  })

  const editShowCartCard = (newState) => {
    console.log("se ejecuta editshow")
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
    return <h1>LOADING...</h1>
  }
  const finalPrice =
    product.discount === 0
      ? product.price
      : (((100 - product.discount) / 100) * product.price).toFixed(2)

  const photo = product.photo.includes("http")
    ? product.photo
    : `http://localhost:4000/${product.photo}`
  
  return (
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
            <p>${finalPrice}</p>
          </div>
          <div>
            <i className="far fa-credit-card fa-lg"></i>
            <p className={styles.interestCard}>3 payments of ${((1.1 * finalPrice) / 3).toFixed(2)}</p>
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
            <i className="fas fa-truck fa-lg"></i>
            <p>Free shipping on purchases from 200 dollars or more.</p>
          </div>
          <p className={styles.calculateSend}>Calculo de envio - CP</p>
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
      <div className={styles.suggestion}>
      </div>
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
