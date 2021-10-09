import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import ProductInCart from "./ProductInCart"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
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
        <h3>SHOPPING CART</h3>
        <i onClick={onClickHandler} className="fas fa-times"></i>
      </div>
     <div className={styles.cartContainerMain}>
     {products.map((obj) => (
          <ProductInCart cartItem={obj} key={obj.product._id} />
        ))}
       {products.length ? <><div className={styles.divPrice}>
          <h4>SUBTOTAL</h4>
          <h4>$ {totalPrice.reduce((a, b) => a + b,).toFixed(2)}</h4>
        </div>
            <div className={styles.divSpan}>
             {view && <>
              <span>You must be logged in to make a purchase</span>
              <Link to="/signin" onClick={onClickHandler}>Sign In</Link> 
              </>}
            </div>
        <div className={styles.divButton}>
          <button onClick={redirectHandler}>FINISH SHOPPING</button>
        </div></> 
         :<div className={styles.warning}>
           <p> <i class="fas fa-exclamation"></i> You don't have any items in your cart.</p>
           <p>Many products are waiting for you!</p>
           <div className={styles.warningButton}>
            <Link to="/products" onClick={onClickHandler}><button>START SHOPPING</button></Link>
            <Link to="/signin" onClick={onClickHandler}><button>SIGN IN</button></Link> 
           </div>
          </div>}
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
