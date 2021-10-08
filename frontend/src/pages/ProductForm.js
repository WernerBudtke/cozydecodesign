import { useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"
import styles from "../styles/ProductForm.module.css"

const ProductForm = ({addProduct}) => {
    const [newProduct, setNewProduct] = useState ({
        name: "",
        photo: null,
        stock: "",
        description: "",
        price: "",
        forSale: "",
        discount:"",
        category: "",
        subcategory: "",
    })
    var subcategories = []

    if(newProduct.category === "Bathroom"){
        subcategories = ["Accesories", "Mirrors"]
    } else if (newProduct.category === "Kitchenware"){
        subcategories = ["Accesories", "Glassware", "Tableware"]
    } else if (newProduct.category === "Decor"){
        subcategories = ["Accesories", "Home", "Lighting"]
    }
    const categories = ["Bathroom","Kitchenware","Decor"]


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
            
            console.log(newProduct)
        }

        }

    return (
            <main>
                <div className={styles.formContainer}>
                    <h4>New Product</h4>
                    <form className={styles.productForm}>
                        <input type="text" onChange={inputHandler} name="name" placeholder="Name" autoComplete="nope"/>
                        <input type="file" onChange={inputHandler} name="photo" placeholder="Photo" autoComplete="nope"/>
                        <textarea onChange={inputHandler} name="description" placeholder="Description" autoComplete="nope"/>
                        <div className={styles.price}>
                            <input type="number" onChange={inputHandler} name="stock" placeholder="Stock" autoComplete="nope"/>
                            <input type="number" onChange={inputHandler} name="price" placeholder="Price" autoComplete="nope"/>
                        </div>
                        <div className={styles.saleInput}>
                            <div className={styles.saleRadios}>
                            <p>For Sale</p>
                            <input type="radio" id="true" name="forSale" value="true" onChange={inputHandler}/>
                            <label htmlFor="true">Yes</label>
                            <input type="radio" id="false" name="forSale" value="false" onChange={inputHandler}/>
                            <label htmlFor="false">No</label>
                            </div>
                            <input type="number" onChange={inputHandler} name="discount" placeholder="Discount" autoComplete="nope"/>
                        </div>
                        <select name="category" onChange={inputHandler} placeholder="Category">
                            <option>Category</option>
                            {categories.map((category,index) => 
                            <option key={index} value={category}> 
                                {category}
                            </option>)}
                        </select>
                        <select name="subcategory" onChange={inputHandler} placeholder="Subcategory">
                            <option>Subcategory</option>
                            {subcategories.map((subcategory,index) => 
                            <option key={index} value={subcategory}> 
                                {subcategory}
                            </option>)}
                        </select>
                    </form>
                        <button className={styles.formButton} onClick={submitForm}>Send</button>
                </div>
            </main>
    )
}

const mapDispatchToProps = {
    addProduct: productsActions.addProduct
}

export default connect(null, mapDispatchToProps)(ProductForm)