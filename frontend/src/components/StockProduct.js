import productsActions from '../redux/actions/productsActions'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
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

    return (
        <div>
            <p>{product.name + ' el stock es ' + product.stock}</p>
            <input value={stock} onChange={inputHandler} type="number" />
            <button id={product._id} onClick={submitChange}>SET</button>
        </div>
    )
}

const mapDispatchToProps = {
    modifyProduct: productsActions.modifyProduct
}

export default  connect(null, mapDispatchToProps)(StockProduct)
