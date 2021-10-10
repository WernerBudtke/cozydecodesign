import styles from "../styles/PaymentGateway.module.css"

const SideProducts = ({ products, total }) => {
  return (
    <>
      {products.map((obj) => {
        return (
          <div key={obj.product._id} className={styles.productInCart}>
            <div
              className={styles.productCartPhoto}
              style={{
                backgroundImage: `url("${
                  obj.product.photo.includes("http")
                    ? obj.product.photo
                    : `http://localhost:4000/${obj.product.photo}`
                }")`,
              }}
            ></div>
            <p>{obj.product.name}</p>
            <div className={styles.productCartInfo}>
              <div>
                <p>{obj.quantity} X </p>

                <p>
                  $
                  {obj.product.discount === 0
                    ? obj.product.price
                    : (
                        ((100 - obj.product.discount) / 100) *
                        obj.product.price
                      ).toFixed(2)}
                </p>
                <p>
                  $
                  {(
                    (obj.product.discount === 0
                      ? obj.product.price
                      : ((100 - obj.product.discount) / 100) *
                        obj.product.price) * obj.quantity
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SideProducts
