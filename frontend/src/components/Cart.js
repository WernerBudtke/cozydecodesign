import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import ProductInCart from "./ProductInCart"

const Cart = ({ onClickHandler, products }) => {

  const totalPrice = products.map(obj => obj.product.discount === 0 ? obj.product.price * obj.quantity 
    : (((100 - obj.product.discount) / 100) * obj.product.price) * obj.quantity)

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContainerHeader}>
        <p>Shopping Cart </p>
        <i onClick={onClickHandler} className="fas fa-times"></i>
      </div>
      <div className={styles.cartContainerMain}>
        {products.map((obj) => (
          <ProductInCart cartItem={obj} key={obj.product._id}/>
        ))}
        <div>
          <p>SUBTOTAL {(totalPrice.reduce((a, b) => a + b, 0)).toFixed(2)} </p>
          <p>PRICE</p>
        </div>
      </div>
    </div>
  )
}

const mapStateTopProps = (state) => {
  return {
    products: state.cart.products,
  }
}

const mapDispatchToProps = {}
export default connect(mapStateTopProps, mapDispatchToProps)(Cart)
