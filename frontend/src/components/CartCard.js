import "../styles/CartCard.css"
import { useState } from "react"

const CartCard = ({products, showCartCard}) => {
    const [closed, setClosed] = useState(true)
    
    const closeCartCard = () => {
        setClosed(!closed)
    }
    
    return (
        <div className = {closed ? "hideCard" : "showCard"}>
          <div className="cartCard">
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
                  onClick={closeCartCard}
                  >X</button>
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
    )
}

export default CartCard