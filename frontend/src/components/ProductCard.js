import styles from "../styles/ProductsGallery.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"

const ProductCard = ({
  product,
  editShowCartCard,
  setProductAlert,
  addCartProduct,
  user,
  newClass,
  productsCart
}) => {
  const [admin, setAdmin] = useState(null)
  const [errorStock, setErrorStock] = useState('')

  useEffect(() => {
    if (user) {
      setAdmin(user.admin)
    }
  }, [])

  const addToCartHandler = () => {
    let newProducts = {
      product: product,
      quantity: 1,
    }
    editShowCartCard(true)
    setProductAlert(newProducts)
    addCartProduct(newProducts)
  }
  const enable = productsCart.find((obj) => obj.product._id === product._id && obj.product.category === 'GiftCard')


  const photo = product.photo?.includes("http")
    ? product.photo
    : `http://localhost:4000/${product.photo}`

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to={`/product/${product._id}`}>
          <div
            className={styles.top}
            style={{ backgroundImage: `url("${photo}")` }}
          ></div>
        </Link>

        <div className={styles.bottom}>
          <div className={styles.nameAndPrice}>
            <h1>{product.name}</h1>
            <p style={{fontSize:'x-small', color:'brown'}}>{errorStock}</p>
            <div>
              <p className={product.discount !== 0 ? styles.sale : null}>
                ${product.price}
              </p>
              {product.discount !== 0 && (
                <p>
                  $
                  {(((100 - product.discount) / 100) * product.price).toFixed(
                    2
                  )}
                </p>
              )}
            </div>
          </div>
          <div className={styles.cardButtons}>
            {!admin && (
              <>
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-cart-plus fa-lg"
                  onClick={!enable ? addToCartHandler : ()=>setErrorStock('No Stock')}
                ></i>
                <Link to={`/product/${product._id}`}>
                  <i className="fas fa-eye fa-lg"></i>
                </Link>
              </>
            )}
            {admin && (
              <Link to={`/productform/${product._id}`}>
                <i className="fas fa-pen fa-lg"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
      {product.discount !== 0 && (
        <div className={styles.inside}>
          <div className={newClass ? styles.newClass : styles.icon}>
            {newClass ? `- ${product.discount}%` : `${product.discount}% OFF`}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    productsCart : state.cart.products
  }
}

const mapDispatchToProps = {
  addCartProduct: cartActions.addCartProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
