import "./HoverCard.css"

const HoverCard = () => {
    return (
      <>
        <div className="wrapper">
          <div className="container">
            <div
              className="top"
              style={{ backgroundImage: `url("https://primedia.primark.com/i/primark/210076792-01?w=1000&h=1000&img404=missing_product&v=1633488792993&locale=en-*,*")`, height: "350px", width: "250px" }}
            ></div>
            <div className="bottom">
              <div className="nameAndPrice">
                <h1>Producto</h1>
                <p>$1200</p>
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
  
  export default HoverCard
  