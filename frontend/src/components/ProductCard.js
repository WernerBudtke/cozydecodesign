import { Link } from "react-router-dom"
import { useState } from "react"
import CartCard from "./CartCard"

const ProductCard = ({ product, addToCartCard }) => {
  console.log(addToCartCard)
  const [showCartCard, setShowCartCard] = useState(false)
  const addProdToCart = () => {
    setShowCartCard(true)
    console.log(showCartCard)
  }
  const addToCart = () => {
    return <CartCard/>
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Link to={`/product/${product._id}`}>
          <div
            className="top"
            style={{ backgroundImage: `url("${product.photo}")` }}
          ></div>
        </Link>

        <div className="bottom">
          <div className="nameAndPrice">
            <h1>{product.name}</h1>
            <div>
              <p className={product.discount !== 0 ? "sale" : null}>
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
          <div className="cardButtons">
            <i className="fas fa-cart-plus fa-2x" onClick={addProdToCart}></i>
            <Link to={`/product/${product._id}`}>
              <i className="fas fa-eye fa-2x"></i>
            </Link>
          </div>
        </div>
      </div>
      {product.discount !== 0 && (
        <div className="inside">
          <div className="icon">SALE</div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
