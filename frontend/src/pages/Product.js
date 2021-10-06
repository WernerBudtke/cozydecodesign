import "../styles/Product.css"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import { useEffect, useState } from "react"

const Product = ({ getAProduct, product, match, products, findAProduct }) => {
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
  if (loading) {
    return <h1>LOADING...</h1>
  }

  return (
    <div className="productSection">
      <div className="mainContainer">
        <div
          className="productImage"
          style={{ backgroundImage: `url("${product.photo}")` }}
        ></div>
        <div className="productInfo">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <div>
            <i class="far fa-credit-card fa-2x"></i>
            <p>3 cuotas con tarjeta</p>
            <p>
              ${(product.price / 3 + (20 * product.price) / 100).toFixed(2)}
            </p>
          </div>
          <div>
            <p>Contador</p>
            <button>Add to Cart</button>
          </div>
          <div className="shippingInfo">
            <i class="fas fa-truck fa-2x"></i>
            <p>Free shipping on purchases from 200 dollars or more</p>
          </div>
          <p>calculo de envio - CP</p>
        </div>
      </div>
      <div className="suggestion"></div>
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
}
export default connect(mapStateTopProps, mapDispatchToProps)(Product)
