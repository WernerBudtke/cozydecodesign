import { useEffect, useState } from "react"
import {connect} from "react-redux"
import productsActions from "../redux/actions/productsActions"

const ProductForm = (props) => {
    const [newProduct, setNewProduct] = useState ({
        name: "",
        photo: null,
        stock: "",
        description: "",
        price: "",
        forSale: "",
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
<<<<<<< HEAD
        console.log(newProduct)
=======
>>>>>>> origin/lucre
    }

    const submitForm = async () => {
        const fd = new FormData()
        fd.append("name", newProduct.name)
        fd.append("photo", newProduct.photo)
        fd.append("stock", newProduct.stock)
        fd.append("description", newProduct.description)
        fd.append("price", newProduct.price)
<<<<<<< HEAD
        fd.append("forSale", newProduct.forSale)
        fd.append("category", newProduct.category)
        fd.append("subcategory", newProduct.subcategory)
        let empty = Object.values(newProduct).some((value) => value === "")
=======
        fd.append("forSale", newProduct.sale)
        fd.append("category", newProduct.category)
        fd.append("subcategory", newProduct.subcategory)
        
        let empty = Object.values(newProduct).some((value) => value === "")
        console.log(empty)
>>>>>>> origin/lucre
        if (empty){
            alert ("complete all the fields")
        } else {
            const response = await props.addProduct(newProduct, fd)
<<<<<<< HEAD
=======
            .then((response) => {
                console.log(response)
            })
>>>>>>> origin/lucre
            if (response.data.success) {
                alert("Producto cargado")
                return false
            }
            alert("Todo salió mal!")
<<<<<<< HEAD
            props.addProduct(newProduct)
            .then((response) => {
                console.log(response)
            })
=======
            
>>>>>>> origin/lucre
            console.log(newProduct)
        }

        }

    return (
            <main className="main">
                <div className="productFormContainer">
                    <h4>New Product</h4>
                    <form className="productForm">
                        <input type="text" onChange={inputHandler} name="name" placeholder="Name" autoComplete="nope"/>
                        <input type="file" onChange={inputHandler} name="photo" placeholder="Photo" autoComplete="nope"/>
                        <textarea onChange={inputHandler} name="description" placeholder="Description" autoComplete="nope"/>
                        <div className="price">
                            <input type="number" onChange={inputHandler} name="stock" placeholder="Stock" autoComplete="nope"/>
                            <input type="number" onChange={inputHandler} name="price" placeholder="Price" autoComplete="nope"/>
                        </div>
                        <div className="sale">
                            <div className="saleRadios">
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
                        <button className="formButton" onClick={submitForm}>Send</button>
                </div>
            </main>
    )
}

const mapDispatchToProps = {
    addProduct: productsActions.addProduct
}

export default connect(null, mapDispatchToProps)(ProductForm)