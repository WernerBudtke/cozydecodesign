import "../styles/Cart.css"

const Cart = ({ onClickHandler }) => {
  return (
    <div className="cartContainer">
      <div className="cartContainerHeader">
        <p>Shopping Cart </p>
        <i onClick={onClickHandler} className="fas fa-times"></i>
      </div>
      <div className="cartContainerMain">
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
        <div
          style={{ border: "1px solid black", width: "30vw", height: "20vh" }}
        ></div>
      </div>
    </div>
  )
}

export default Cart
