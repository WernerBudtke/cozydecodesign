import productsActions from '../redux/actions/productsActions'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import styles from '../styles/Admin.module.css'
import { Link } from 'react-router-dom'
const StockProduct = ({modifyProduct, product, fetch}) => {
    const [stock, setStock] = useState(0)
    
    useEffect(() => {
        setStock(parseInt(product.stock))
    }, [product])

    const inputHandler = (e) => {
        setStock(parseInt(e.target.value))
    }

    const submitChange = async (e) => {
        let response = await modifyProduct(e.target.id, {stock: stock})
        if (response.success) {
            fetch()
        } else {
            alert('Falló')
        }
    }
    console.log(product)
    return (
            <div className={styles.stockCard}>
                <div>
                    <p>{product.name}</p>
                </div>
                <div className={styles.manageStock}>
                    <input value={stock} onChange={inputHandler} type="number" />
                    <button id={product._id} onClick={submitChange}>SET</button>
                    <Link to={`/productform/${product._id}`}><button id={product._id} onClick={submitChange}>EDIT</button></Link>
                </div>
            </div>  
    )
}

const mapDispatchToProps = {
    modifyProduct: productsActions.modifyProduct
}

export default  connect(null, mapDispatchToProps)(StockProduct)