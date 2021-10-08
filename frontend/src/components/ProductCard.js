import styles from "../styles/ProductsGallery.module.css"
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import { useEffect, useState } from "react"
import cartActions from "../redux/actions/cartActions"

const ProductCard = ({ product, editShowCartCard, setProductAlert,addCartProduct, user }) => {
  const[admin, setAdmin] = useState(null)
  useEffect(()=>{
    if(user){
      setAdmin(user.admin)
    }
  },[])

  const addToCartHandler = () => {
    let newProducts = {
      product: product,
      quantity: 1,
    }
    setProductAlert(newProducts)
    editShowCartCard(true)
    addCartProduct(newProducts)
  }
  const photo = product.photo.includes('http') ? product.photo : `http://localhost:4000/${product.photo}`

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link to={`/product/${product._id}`}>
          <div
            className={styles.top}
            style={{ backgroundImage:`url("${photo}")`}}
          ></div>
        </Link>

        <div className={styles.bottom}>
          <div className={styles.nameAndPrice}>
            <h1>{product.name}</h1>
            <div>
              <p className={product.discount !== 0 ? styles.sale : null}>
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
          <div className={styles.cardButtons}>
          {!admin && <>
            <i className="fas fa-cart-plus fa-2x" onClick={addToCartHandler}></i>
            <Link to={`/product/${product._id}`}>
              <i className="fas fa-eye fa-2x"></i>
            </Link>
            </>}
          {admin && <Link to={`/productform/${product._id}`}><i className="fas fa-pen fa-2x"></i></Link>}
          </div>
        </div>
      </div>
      {product.discount !== 0 && (
        <div className={styles.inside}>
          <div className={styles.icon}>{product.discount}% OFF</div>
        </div>
      )}
    </div>
  )
}

const mapStateTopProps=(states)=>{
  return{
    user:states.users.user
  }
}

const mapDispatchToProps={
  addCartProduct:cartActions.addCartProduct
}

export default connect(mapStateTopProps,mapDispatchToProps)(ProductCard)
