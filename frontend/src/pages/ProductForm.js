import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/ProductForm.module.css"

const ProductForm = ({addProduct, modifyProduct, findAProduct, match, product}) => {
    var productId = match.params.id
    const [newProduct, setNewProduct] = useState ({
        name: productId ? product.name : "",
        photo: productId ? product.photo : null,
        stock: productId ? product.stock : "",
        description: productId ? product.description : "",
        price: productId ? product.price : "",
        forSale: productId ? product.forSale : "",
        discount:productId ? product.discount : "",
        category: productId ? product.category : "",
        subcategory: productId ? product.subcategory : "",
    })

    useEffect(() => {
        findAProduct(productId)
    }, [productId])

    var subcategories = []
    
    if(newProduct.category === "Bathroom"){
        subcategories = ["Accesories", "Mirrors"]
    } else if (newProduct.category === "Kitchenware"){
        subcategories = ["Accesories", "Glassware", "Tableware"]
    } else if (newProduct.category === "Decor"){
        subcategories = ["Accesories", "Home", "Lighting"]
    } else if (newProduct.category === "GiftCard"){
        subcategories = ["GiftCard"]
    } 
    const categories = ["Bathroom","Kitchenware","Decor","GiftCard"]

    const inputHandler = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.name === "photo" ? e.target.files[0] : e.target.value
        })
    }

    const submitForm = async () => {
        const fd = new FormData()
        fd.append("name", newProduct.name)
        fd.append("photo", newProduct.photo)
        fd.append("stock", newProduct.stock)
        fd.append("description", newProduct.description)
        fd.append("price", newProduct.price)
        fd.append("forSale", newProduct.forSale)
        fd.append("category", newProduct.category)
        fd.append("subcategory", newProduct.subcategory)
        fd.append("discount", newProduct.discount)
        let empty = Object.values(newProduct).some((value) => value === "")
        if (empty){
            alert ("complete all the fields")
        } else {
            const response = await addProduct(fd)
            if (response.data.success) {
                alert("Producto cargado")
                return false
            }else{
                alert("Todo salió mal!")
            }
        }
    }

    const editProduct = (id, stock) => {
        modifyProduct(id, stock)
        .then((res)=> {
        console.log(res)
        })
        .catch(error =>console.log(error))
    }

    return (
            <main>
                <div className={styles.formContainer}>
                    {productId ? <h4>Edit Product</h4> : <h4>New Product</h4>}
                    
                    <form className={styles.productForm}>
                        <input type="text" onChange={inputHandler} name="name" placeholder="Name" autoComplete="nope" defaultValue={product?.name}/>
                        <input type="file" onChange={inputHandler} name="photo" placeholder="Photo" autoComplete="nope" defaultValue={product?.photo}/>
                        <textarea onChange={inputHandler} name="description" placeholder="Description" autoComplete="nope" defaultValue={product?.description}/>
                        <div className={styles.price}>
                            <input type="number" onChange={inputHandler} name="stock" placeholder="Stock" autoComplete="nope" defaultValue={product?.stock}/>
                            <input type="number" onChange={inputHandler} name="price" placeholder="Price" autoComplete="nope" defaultValue={product?.price}/>
                        </div>
                        <div className={styles.saleInput}>
                            <div className={styles.saleRadios}>
                            <p>For Sale</p>
                            <input type="radio" id="true" name="forSale" value="true" onChange={inputHandler} defaultValue={product?.forSale}/>
                            <label htmlFor="true">Yes</label>
                            <input type="radio" id="false" name="forSale" value="false" onChange={inputHandler} defaultValue={product?.forSale}/>
                            <label htmlFor="false">No</label>
                            </div>
                            <input type="number" onChange={inputHandler} name="discount" placeholder="Discount" autoComplete="nope" defaultValue={product?.discount}/>
                        </div>
                        <select name="category" onChange={inputHandler} placeholder="Category" defaultValue={product?.category}>
                            <option>Category</option>
                            {categories.map((category,index) => 
                            <option key={index} value={category}> 
                                {category}
                            </option>)}
                        </select>
                        <select name="subcategory" onChange={inputHandler} placeholder="Subcategory" defaultValue={product?.subcategory}>
                            <option>Subcategory</option>
                            {subcategories.map((subcategory,index) => 
                            <option key={index} value={subcategory}> 
                                {subcategory}
                            </option>)}
                        </select>
                    </form>
                        <button className={styles.formButton} onClick={productId ? () => editProduct(productId, newProduct) : () => submitForm()}>Send</button>
                </div>
            </main>
    )
}

const mapStateToProps = state => {
    return {
        product: state.products.product
    }
}

const mapDispatchToProps = {
    addProduct: productsActions.addProduct,
    findAProduct: productsActions.findAProduct,
    modifyProduct: productsActions.modifyProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)