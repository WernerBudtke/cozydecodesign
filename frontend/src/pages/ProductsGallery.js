import "../styles/ProductsGallery.css"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"

const ProductsGallery = ({ products, getProducts }) => {
  const [showCartCard, setShowCartCard] = useState(false)
  useEffect(() => {
    window.scroll(0, 0)
    document.title='COZY | STORE'
    getProducts().then((res) => {
      if (!res.success) {
        console.log(res)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addToCart = () => {
    setShowCartCard(true)
  }

  return (
    <div className="productsGallery">
      <CartCard products={products} showCartCard={showCartCard}/>
      <div className="productsCards">
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} addToCartCard={addToCart}/>
        })}
      </div>
    </div>
  )
}
const mapStateTopProps = (state) => {
  return {
    products: state.products.products,
  }
}

const mapDispatchToProps = {
  getProducts: productsActions.getProducts,
}
export default connect(mapStateTopProps, mapDispatchToProps)(ProductsGallery)
