import { useEffect, useState } from "react"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/Admin.module.css"

const AdminStats = ({ getProducts, products }) => {
  const [productsSold, setProductSold] = useState(null)
  const [totalProfit, setTotalProfit] = useState(null)

  useEffect(() => {
    const res = async () => {
      let response = await getProducts()
      if (!response.success) {
        alert("Error")
      }
    }
    products.length === 0 && res()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const add = (a, b) => {
    return a + b
  }

  useEffect(() => {
    setProductSold(products.map((product) => product.sold).reduce(add, 0))
    setTotalProfit(
      products
        .map((product) =>
          product.discount > 0
            ? product.sold * (product.price * (1 - product.discount / 100))
            : product.sold * product.price
        )
        .reduce(add, 0)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  return (
    <div className={styles.statsContainer}>
      <div>
        <i className="fas fa-shopping-cart fa-2x"></i>
        <p>Total sales: {productsSold}</p>
      </div>
      <div>
        <i className="fas fa-hand-holding-usd fa-2x"></i>
        <p>Total profit: ${totalProfit && totalProfit.toFixed(2)}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  }
}

const mapDispatchToProps = {
  getProducts: productsActions.getProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStats)
