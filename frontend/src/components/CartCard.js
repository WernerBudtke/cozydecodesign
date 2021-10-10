import styles from "../styles/CartCard.module.css"

const CartCard = ({ productAlert, showCartCard, editShowCartCard }) => {
 
  const photo = productAlert.product.photo.includes("http")
    ? productAlert.product.photo
    : `https://cozydeco.herokuapp.com/${productAlert.product.photo}`

  return (
    <>
      <div className={!showCartCard ? styles.hideCard : styles.showCard}>
        <div className={styles.cartCard}>
          <div className={styles.topToast}>
            <div>
              <div
                style={{
                  backgroundImage: `url(${photo})`,
                  width: "70px",
                  height: "70px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="h-4 w-4 rounded-full"
              ></div>
            </div>
            <div className={styles.infoCart}>
              <p>{productAlert.product.name}</p>
              <p>
                {productAlert.quantity} x ${productAlert.product.price}
              </p>
              <p className="bold">Successfully added to cart!</p>
            </div>
            <div className="close">
            <i onClick={()=>editShowCartCard(false)} className="fas fa-times"></i>
            </div>
          </div>
          {/* <div className={styles.bottomToast}> */}
            <div className={styles.total}>
              <p>Total ({productAlert.quantity}product):</p>
              <p>$ {productAlert.product.price}</p>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default CartCard
