const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div
            className="top"
            style={{ backgroundImage: `url("${product.photo}")` }}
          ></div>
          <div className="bottom">
            <div className="nameAndPrice">
              <h1>{product.name}</h1>
              <p>${product.price}</p>
            </div>
            <div className="cardButtons">
              <i className="fas fa-cart-plus fa-2x"></i>
              <i className="fas fa-eye fa-2x"></i>
            </div>
          </div>
        </div>
        <div className="inside">
          <div className="icon">SALE</div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
