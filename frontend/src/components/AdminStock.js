import { connect } from 'react-redux'
import styles from '../styles/Admin.module.css'
import { useEffect, useState } from 'react'
import productsActions from '../redux/actions/productsActions'
import StockProduct from './StockProduct'


const AdminStock = ({products, getProducts}) => {
    const [render, setRender] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const res = async () => {
            let response = await getProducts()
            if (!response.success) {
                setError('Network Error')
            }
        }
        res()
    }, [render])

    const fetchAgain = () => {
        setRender(!render)
    }

    return (
        <div className={styles.stockContainer}>
            <h1>Stock</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {products.map((product) => <StockProduct fetch={fetchAgain} key={product._id} product={product} />)}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        products: state.products.products
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.getProducts
}

export default  connect(mapStateToProps, mapDispatchToProps)(AdminStock)
