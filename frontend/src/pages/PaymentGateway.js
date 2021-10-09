import { useState } from "react"
import styles from "../styles/PaymentGateway.module.css"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"
import userActions from "../redux/actions/userActions"
import Paypal from "../components/Paypal"

//VENDEDOR
//sb-imkhe8058198@business.example.com
//<g/2#2wF

//COMPRADOR
//sb-dfobu8056038@personal.example.com
//s7%C68F#

//CLIENT ID
//AWRVu1dvYAIDrl-vZ5_ST31KBhCxaoAr8-IIsNOYSwlWwMJBoUGiEsrc5H9dLg5DAoWyrhsjE3-UqEMw

const PaymentGateway = ({ loginUser, products }) => {
  const [info, setInfo] = useState({
    zipCode: "",
    number: "",
    city: "",
    street: "",
    phone: "",
    dni: "",
    firstName: loginUser.firstName,
    lastName: loginUser.lastName,
    eMail: loginUser.eMail,
  })
  const [paypal, setPaypal] = useState(false)
  const validate = () => {
    setPaypal(true)
  }

  const totalPrice = products.map((obj) =>
    obj.product.discount === 0
      ? obj.product.price * obj.quantity
      : ((100 - obj.product.discount) / 100) * obj.product.price * obj.quantity
  )

  const [order, setOrder] = useState({
    products: products.map((obj) => ({
      productId: obj.product._id,
      quantity: obj.quantity,
    })),
    paymenMethod: {
      type: "",
      extraInfo: "",
    },
    totalPrice: totalPrice.reduce((a, b) => a + b, 0).toFixed(2),
  })
  const sideProducts = products.map((obj) => {
    return (
      <div className={styles.productInCart}>
        <div
          className={styles.productCartPhoto}
          style={{ backgroundImage: `url("${obj.product.photo}")` }}
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
                  : ((100 - obj.product.discount) / 100) * obj.product.price) *
                obj.quantity
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    )
  })
  const fillUserInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    })
  }

  let date = new Date()

  return (
    <div className={styles.gatewayContainer}>
      <div className={styles.clientInfo}>
        <div className={styles.personalInfo}>
          <h1>Personal Info</h1>
          <label>Email</label>
          <input
            type="text"
            required
            name="eMail"
            defaultValue={info.eMail}
            disabled
          />
          <div>
            <label>Name</label>
            <input
              type="text"
              required
              name="firstName"
              defaultValue={info.firstName}
              disabled
            />
            <label>Lastname</label>
            <input
              type="text"
              required
              name="lastName"
              defaultValue={info.lastName}
              disabled
            />
          </div>
          <div>
            <label>DNI</label>
            <input
              type="text"
              required
              name="dni"
              defaultValue={info.dni}
              onChange={fillUserInfo}
            />
            <label>Phone Number</label>
            <input
              type="text"
              required
              name="phone"
              defaultValue={info.phone}
              onChange={fillUserInfo}
            />
          </div>
        </div>
        <div className={styles.shipmentInfo}>
          <h1>Domicilio de entrega</h1>
          <div>
            <label>Calle</label>
            <input
              type="text"
              required
              name="street"
              defaultValue={info.street}
              onChange={fillUserInfo}
            />

            <label>Number - piso/depto:</label>
            <input
              type="text"
              required
              name="number"
              defaultValue={info.number}
              onChange={fillUserInfo}
            />
          </div>
          <div>
            <label>Ciudad</label>
            <input
              type="text"
              required
              name="city"
              defaultValue={info.city}
              onChange={fillUserInfo}
            />
          </div>

          <div>
            <h1>Payment</h1>
            <label>Paypal</label>
            <input type="radio" id="true" name="" value="" />
            <label>Credit/Debit Card</label>
            <input type="radio" id="true" name="" value="" />
          </div>
        </div>
        <button onClick={validate}>Completar Pago</button>
        {paypal && (
          <Paypal
            description={`Compra del dia ${date.toLocaleDateString()}`}
            total={32}
          />
        )}
      </div>
      <div>
        <h1>CARRITO</h1>
        {sideProducts}
      </div>
    </div>
  )
}

const mapStateTopProps = (state) => {
  return {
    products: state.cart.products,
    loginUser: state.users.user,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateTopProps, mapDispatchToProps)(PaymentGateway)
