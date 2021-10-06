import "./HoverCard.css"
import toast, { Toaster } from "react-hot-toast"

const HoverCard = () => {

const toasting = () => {
  toast.custom((t) => (
    <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } bg-black `}>
      <div className="addToCart">
        <div className="topToast">
            <div>
              <div style={{backgroundImage: `url("https://i.postimg.cc/g2dLtyDR/logOut.png")`, width: "70px", height: "70px", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}className="h-4 w-4 rounded-full" >
              </div>
            </div>
            <div className="infoCart">
              <p>*product name*</p>
              <p>*num* x *price*</p>
              <p className="bold">Successfully added to cart!</p>
            </div>
              <div  className="close">
              <button
              onClick={() => toast.dismiss(t.id)}
              >
              X
              </button>
              </div>
          </div>
          <div className="bottomToast">
            <div className="total">
              <p>Total ( *cant de prods* ):</p>
              <p>$ *precio*</p>
            </div>
            <div className="buttonContainer">
              <button>SEE CART</button>
            </div>
          </div>

        </div>
    </div>
  ))
}
  
    return (
      <div style={{display: "flex"}}>
        <Toaster
          position="top-right"
          containerStyle={{
            top: 80,
            left: 20,
            bottom: 20,
            right: 10,
          }}
          toastOptions={{
            duration: 1500,
          }}
        />
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
        <button onClick={toasting}>Carrito</button>

        
      </div>
    )
  }
  
  export default HoverCard