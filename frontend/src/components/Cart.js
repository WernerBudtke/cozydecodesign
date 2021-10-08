import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import ProductInCart from "./ProductInCart"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useHistory } from "react-router-dom"

const Cart = ({ onClickHandler, products, loginUser }) => {
  const [view, setView] = useState(false)
  let history = useHistory()
  const totalPrice = products.map((obj) =>
    obj.product.discount === 0
      ? obj.product.price * obj.quantity
      : ((100 - obj.product.discount) / 100) * obj.product.price * obj.quantity
  )

  const redirectPayment = () => {
    onClickHandler()
    history.push("/payment")
  }
  const redirectHandler = () => {
    loginUser ? redirectPayment() : setView(true)
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContainerHeader}>
        <p>Shopping Cart </p>
        <i onClick={onClickHandler} className="fas fa-times"></i>
      </div>
      <div className={styles.cartContainerMain}>
        {products.map((obj) => (
          <ProductInCart cartItem={obj} key={obj.product._id} />
        ))}
        <div>
          <p>SUBTOTAL {totalPrice.reduce((a, b) => a + b, 0).toFixed(2)} </p>
          <p>PRICE</p>
        </div>
        <div>
          {view && (
            <div>
              <p>You must be logged in to make a purchase</p>
              <Link to="/signin" onClick={onClickHandler}>
                Sign In
              </Link>
            </div>
          )}
          <button onClick={redirectHandler}>PAGAR</button>
          <Link>HOME</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateTopProps = (state) => {
  return {
    products: state.cart.products,
    loginUser: state.users.user,
  }
}

const mapDispatchToProps = {}
export default connect(mapStateTopProps, mapDispatchToProps)(Cart)
