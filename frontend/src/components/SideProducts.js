import { Link } from "react-router-dom"
import styles from "../styles/SideProducts.module.css"

const SideProducts = ({ products, total }) => {
  return (
    <div className={styles.conteinerSideProducts}>
      <div className={styles.sideProducts}>
        <h2>Shopping Cart </h2>
        {products.map((obj) => {
          return (
            <div key={obj.product._id} className={styles.productInCart}>
              <div
                className={styles.productCartPhoto}
                style={{
                  backgroundImage: `url("${
                    obj.product.photo.includes("http")
                      ? obj.product.photo
                      : `http://localhost:4000/${obj.product.photo}`
                  }")`,
                }}
              ></div>
              <div className={styles.productCartInfo}>
                <Link to={`product/${obj.product._id}`}>
                  <p>{obj.product.name}</p>
                </Link>
                <div>
                  <p>
                    {obj.quantity} u. X $
                    {obj.product.discount === 0
                      ? obj.product.price
                      : (
                          ((100 - obj.product.discount) / 100) *
                          obj.product.price
                        ).toFixed(2)}
                  </p>

                  <p>
                    Subtotal $ 
                    <span>
                      {(
                        (obj.product.discount === 0
                          ? obj.product.price
                          : ((100 - obj.product.discount) / 100) *
                            obj.product.price) * obj.quantity
                      ).toFixed(2)}{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div className={styles.totalPrice}>
          <p>
            Total Price <span> ${total}</span>
          </p>
          <Link to="/products">
            <button>Edit Cart</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideProducts
