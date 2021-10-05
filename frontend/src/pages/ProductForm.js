import { useState } from "react"

const ProductForm = () => {
    const [newProduct, setNewProduct] = useState ({
        name: "",
        photo: "",
        stock: "",
        description: "",
        price: "",
        sale: "",
        category: "",
        subcategory: "",
    })

    const inputHandler = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        console.log(newProduct)
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
                        <input type="text" onChange={inputHandler} name="category" placeholder="Category" autoComplete="nope"/>
                        <input type="text" onChange={inputHandler} name="subcategory" placeholder="Subcategory" autoComplete="nope"/>
                    </form>
                        <button className="formButton" 
                        onClick={submitForm}
                        >Send</button>
                </div>
            </main>
    )
}

export default ProductForm