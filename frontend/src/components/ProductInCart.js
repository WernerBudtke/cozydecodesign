import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import { useState } from "react"
import cartActions from "../redux/actions/cartActions"

const ProductInCart = ({ cartItem, deleteACartProduct }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity)

  return (
    <div className={styles.productInCart}>
      <div
        className={styles.productCartPhoto}
        style={{ backgroundImage: `url("${cartItem.product.photo}")` }}
      ></div>
      <div className={styles.productCartInfo}>
        <div>
          <p>{cartItem.product.name}</p>
          <i
            onClick={() => deleteACartProduct(cartItem.product._id)}
            className="fas fa-trash-alt fa-2x"
          ></i>
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
                cartItem.product.stock === quantity
                  ? alert("no hay stock")
                  : setQuantity(quantity + 1)
              }}
            ></i>
          </div>
          <p>
            $
            {cartItem.product.discount === 0
              ? cartItem.product.price
              : (
                  ((100 - cartItem.product.discount) / 100) *
                  cartItem.product.price
                ).toFixed(2)}
          </p>
          <p>
            $
            {(cartItem.product.discount === 0
              ? cartItem.product.price
              : (
                  ((100 - cartItem.product.discount) / 100) *
                  cartItem.product.price
                ).toFixed(2)) * cartItem.quantity}
          </p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  deleteACartProduct: cartActions.deleteACartProduct,
}
export default connect(null, mapDispatchToProps)(ProductInCart)
