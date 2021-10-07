import { connect } from 'react-redux'
import '../styles/Admin.css'
import { useEffect, useState } from 'react'
import productsActions from '../redux/actions/productsActions'
import StockProduct from './StockProduct'

const AdminStock = ({products, getProducts}) => {
    const [render, setRender] = useState(false)

    useEffect(() => {
        const res = async () => {
            let response = await getProducts()
            if (!response.success) {
                alert('Error')
            }
        }
        res()
    }, [render])

    const fetchAgain = () => {
        setRender(!render)
    }

    return (
        <div>
            <h4>Stock</h4>
            <div>
                {products.map((product) => <StockProduct fetch={fetchAgain} key={product._id} product={product} />)}
            </div>
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
