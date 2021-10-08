import styles from "../styles/Cart.module.css"
import { connect } from "react-redux"
import ProductInCart from "./ProductInCart"

const Cart = ({ onClickHandler, products }) => {
  console.log(products)
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
          <p>SUBTOTAL</p>
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
