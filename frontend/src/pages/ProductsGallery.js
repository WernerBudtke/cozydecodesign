import styles from "../styles/ProductsGallery.module.css"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"
import { Link } from "react-router-dom"

const ProductsGallery = ({ products, getProducts, productsCategory, match, getProductByCategory}) => {
  const [showCartCard, setShowCartCard] = useState(false)
  const [productAlert, setProductAlert] = useState(null)
  const [order, setOrder] = useState(null)
  const [view, setView] = useState({category: null, subcategory: null})

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "COZY | STORE"
    if (!products.length) {
      getProducts()
    } else {
      getProductByCategory(match.params.category)
    }
    if (match.params.category) {
      setView({category: match.params.category, subcategory: null})
    } else {
      setView({category: null, subcategory: null})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params])
  if (!order) {
    productsCategory.sort((a,b) => a.stock - b.stock)
  }
  const editShowCartCard = (newState) => {
    setShowCartCard(newState)
  }

   if(productAlert){
     setTimeout(() => {
       setProductAlert(null)
     },2500)
   }

   const sortProducts = (e) => {
     if (e.target.value !== "relevant") {
       productsCategory.sort((a, b) => e.target.value === "minor" ? a.price - b.price : b.price - a.price)
     } else {
       productsCategory.sort((a,b) => a.stock - b.stock)
     }
    setOrder(e.target.value)
   }

   let productsSubcategory = !view.subcategory ? productsCategory : productsCategory.filter((obj) => obj.subcategory === view.subcategory )
   
   const viewHandler = (e) => {
     setView({...view, subcategory: e.target.value})
   }

  return (
    <div className={styles.productsGallery}>
      {productAlert && (
        <CartCard
          productAlert={productAlert}
          showCartCard={showCartCard}
          editShowCartCard={editShowCartCard}
        />
      )}
      <div className={styles.productsCards}>
        {productsSubcategory.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              editShowCartCard={editShowCartCard}
              setProductAlert={setProductAlert}
            />
          )
        })}
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.inputContainer}>
          <div>
            <Link to="/products">All products</Link>
          </div>
          <div>
            <Link to="/products/Kitchenware">Kitchenware</Link>
            {view.category === 'Kitchenware' && 
            <div>
              <input type="button" value="Accesories" onClick={viewHandler} />
              <input type="button" value="Glassware" onClick={viewHandler} />
              <input type="button" value="Tableware" onClick={viewHandler} />
            </div>}
          </div>
          <div>
            <Link to="/products/Bathroom">Bathroom</Link>
            {view.category === 'Bathroom' && 
            <div>
              <input type="button" value="Accesories" onClick={viewHandler} />
              <input type="button" value="Mirrors" onClick={viewHandler} />
            </div>}
          </div>
          <div>
            <Link to="/products/Decor">Decor</Link>
            {view.category === 'Decor' && 
            <div>
              <input type="button" value="Accesories" onClick={viewHandler} />
              <input type="button" value="Home" onClick={viewHandler} />
              <input type="button" value="Lighting" onClick={viewHandler} />
            </div>}
          </div>
          <div>
            <Link to="/products/GiftCard">GitfCard</Link>
          </div>
          <div>
            <select onChange={sortProducts}>
              <option value="relevant">Most relevant</option>
              <option value="minor">Lower to higher</option>
              <option value="mayor">Higher to lower</option>
            </select>
          </div>
        </div>
        <div>
          <hr />
          <h1>COZY</h1>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    productsCategory: state.products.productsCategory
  }
}

const mapDispatchToProps = {
  getProducts: productsActions.getProducts,
  getProductByCategory: productsActions.getProductByCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsGallery)
