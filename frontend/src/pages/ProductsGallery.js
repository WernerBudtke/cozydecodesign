import { useEffect, useState } from "react"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import productsActions from "../redux/actions/productsActions"

const ProductsGallery = ({ products, getProducts }) => {
  const [newProducts, setNewProducts] = useState([])

  useEffect(() => {
    getProducts().then((res) => {
      if (!res.success) {
        console.log(res)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(products)

  return (
    <>
      <div>aca va algo</div>
      <div className="productsGallery">
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })}
      </div>
    </>
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
