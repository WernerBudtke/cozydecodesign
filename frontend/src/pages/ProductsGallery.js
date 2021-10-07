import "../styles/ProductsGallery.css"
import { useEffect } from "react"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import productsActions from "../redux/actions/productsActions"

const ProductsGallery = ({ products, getProducts }) => {
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

  return (
    <div className="productsGallery">
      <div className="productsCards">
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />
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
