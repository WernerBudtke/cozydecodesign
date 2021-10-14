import { useState, useEffect } from "react"
import styles from "../styles/PaymentGateway.module.css"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import cartActions from "../redux/actions/cartActions"
import Paypal from "../components/Paypal"
import MercadoPagoForm from "../components/MercadoPago/MercadoPagoForm"
import productsActions from "../redux/actions/productsActions"
import SideProducts from "../components/SideProducts"
import Header from "../components/Header"
import toast from 'react-hot-toast';
import PayWithCard from "../components/PayWithCard"
import { Link } from "react-router-dom"


//VENDEDOR
//sb-imkhe8058198@business.example.com
//<g/2#2wF

//COMPRADOR
//sb-dfobu8056038@personal.example.com
//s7%C68F#

//CLIENT ID
//AWRVu1dvYAIDrl-vZ5_ST31KBhCxaoAr8-IIsNOYSwlWwMJBoUGiEsrc5H9dLg5DAoWyrhsjE3-UqEMw

const PaymentGateway = ({
  loginUser,
  products,
  manageUser,
  getProducts,
  editCard,
  addNewOrder,
  history,
  addCard,
  getCard,
  deleteAllCartProduct,
}) => {
  const [sharedPayment, setSharedPayment] = useState(false)
  const [code, setCode] = useState(null)
  const [balance, setBalance] = useState(null)
  const [hideRadio, setHideRadio] = useState(true)
  const [enableInput, setEnableInput] = useState(false)
  const [enablePayment, setEnablePayment] = useState(true)
  const [renderError, setRenderError] = useState(null)
  const [chosenMethod, setChosenMethod] = useState({
    type: null,
    enable: false,
  })
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

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "COZY | PAYMENT"
  }, [])

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
    paymentMethod: {
      type: "",
      extraInfo: "",
    },
    totalPrice: totalPrice.reduce((a, b) => a + b, 0).toFixed(2),
  })

  const validateGift = products.filter(
    (obj) => obj.product.category === "GiftCard"
  )

  if (validateGift.length) {
    var giftCard = validateGift.map((obj) => ({ balance: obj.product.price }))
  }

  console.log(giftCard)
  const validate = () => {
    if (Object.values(info).some((value) => value === "")) {
      setRenderError("You need to complete all the fields to continue!")
    } else {
      manageUser(info).then((res) => {
        if (res.success) {
          setChosenMethod({ ...chosenMethod, enable: true })
          setEnableInput(true)
          setHideRadio(false)
          setEnablePayment(true)
          setRenderError("")
        } else {
          setRenderError("The information provided is incorrect!")
        }
      })
    }
  }

  const fillUserInfo = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    })
  }

  const fillOrderInfo = (e, add) => {
    setOrder({
      ...order,
      paymentMethod: {
        extraInfo: !add
          ? null
          : `giftCArd : $${balance} - ${e.target.value} : $${sharedPaymentPrice} `,
        type: !add
          ? e.target.value
          : `${order.paymentMethod.type} - ${e.target.value}`,
      },
    })
    setChosenMethod({
      ...chosenMethod,
      type: !add ? e.target.value : `${chosenMethod.type} - ${e.target.value}`,
    })
    add && setSharedPayment(true)
  }

  const addNewOrderHandler = () => {
    console.log(giftCard)
    if (giftCard) {
      addCard(giftCard).then((res) => console.log(res))
    }
    if (
      order.paymentMethod.extraInfo ||
      order.paymentMethod.type === "GiftCard"
    ) {
      let obj = {
        balance: checkBalance < 0 ? 0 : checkBalance,
        code,
      }
      editCard(obj)
    }
    addNewOrder(order).then((res) => {
      setChosenMethod({ ...chosenMethod, enable: false })
      deleteAllCartProduct()
      getProducts()
      history.push("/", { view: true })
    })
  }

  let date = new Date()

  const fillCode = (e) => {
    setCode(e.target.value)
  }
  const getCardHandler = () => {
    getCard(code).then((res) => {
      if (res.success) {
        setBalance(res.res.balance)
      } else {
        setBalance("Invalid Giftcard code")
      }
    })
  }

  const checkBalance =
    typeof balance === "number" ? (balance - order.totalPrice).toFixed(2) : null

  const sharedPaymentPrice = Math.abs(checkBalance)

  const catchPagoErr = () => {
    setChosenMethod({
      ...chosenMethod,
      enable: false,
    })
    setEnableInput(false)
    setEnablePayment(false)
    setHideRadio(true)
    toast.custom(
      <div className={styles.alertPago}>
        <p><i className="fas fa-exclamation-circle"></i> We were unable to process the payment, please try again, or choose another payment method.</p>
      </div>, {duration:3000}, 
    )
  }

  return (
    <>
      <Header viewCart={true} />
      <div className={styles.gatewayContainer}>
        <div className={styles.checkoutInfo}>
        <div className={styles.totalPrice768}>
          <Link to="/products">
            <button>Edit Cart</button>
          </Link>
        </div>
          <h1>Personal Info</h1>
          <div className={styles.inputMail}>
            <label>Email:</label>
            <input
              type="text"
              required
              name="eMail"
              defaultValue={info.eMail}
              disabled
            />
          </div>
          <div className={styles.inputDiv}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                required
                name="firstName"
                defaultValue={info.firstName}
                disabled
              />
            </div>
            <div>
              <label>Lastname:</label>
              <input
                type="text"
                required
                name="lastName"
                defaultValue={info.lastName}
                disabled
              />
            </div>
          </div>
          <div className={styles.inputDiv}>
            <div>
              <label>DNI:</label>
              <div>
                <input
                  type="text"
                  required
                  name="dni"
                  defaultValue={info.dni}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
            <div>
              <label>Phone Number:</label>
              <div>
                <input
                  type="text"
                  required
                  name="phone"
                  defaultValue={info.phone}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
          </div>

          <h1>Shipment Info</h1>
          <div className={styles.inputDiv}>
            <div>
              <label>Adress:</label>
              <div>
                <input
                  type="text"
                  required
                  name="street"
                  defaultValue={info.street}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
            <div>
              <label>Number:</label>
              <div>
                <input
                  type="text"
                  required
                  name="number"
                  defaultValue={info.number}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <div>
              <label>City:</label>
              <div>
                <input
                  type="text"
                  required
                  name="city"
                  defaultValue={info.city}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
            <div>
              <label>Zip Code:</label>
              <div>
                <input
                  type="text"
                  required
                  name="zipCode"
                  defaultValue={info.zipCode}
                  onChange={fillUserInfo}
                  disabled={enableInput}
                />
                <span className={styles.bar}></span>
              </div>
            </div>
          </div>

          <h1>Payment</h1>
          <div className={styles.radioButtons}>
            {hideRadio ? (
              <div className={styles.switchField}>
                <div>
                  <input
                    type="radio"
                    id="paypal"
                    name="payMethod"
                    defaultValue="PayPal"
                    onChange={fillOrderInfo}
                    onClick={() => setEnablePayment(false)}
                    disabled={enableInput}
                  />
                  <label for="paypal">Paypal</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="mercadopago"
                    name="payMethod"
                    defaultValue="MercadoPago"
                    onChange={fillOrderInfo}
                    onClick={() => setEnablePayment(false)}
                    disabled={enableInput}
                  />
                  <label for="mercadopago">Credit/Mercado Pago </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="giftcard"
                    name="payMethod"
                    defaultValue="GiftCard"
                    onChange={fillOrderInfo}
                    onClick={() => setEnablePayment(false)}
                    disabled={enableInput}
                  />
                  <label for="giftcard">Gift Card</label>
                </div>
              </div>
            ) : (
              <h2>{order.paymentMethod.type} </h2>
            )}
          </div>

          <button
            className={styles.checkOut}
            disabled={enablePayment}
            onClick={validate}
          >
            Checkout Order
          </button>
          <p className={styles.error}>{renderError}</p>
          {chosenMethod.enable && chosenMethod.type.includes("GiftCard") && (
            <div>
              <div className={styles.giftCardCode}>
                <label>Enter your Giftcard Code</label>
                <div>
                  <input
                    type="text"
                    required
                    name="giftCardCode"
                    defaultValue=" "
                    onChange={fillCode}
                  />
                  <span className={styles.bar}></span>
                </div>
                <button onClick={getCardHandler}>Check balance</button>
              </div>

              {typeof balance === "string" && (
                <p className={styles.error}>{balance}</p>
              )}
              {checkBalance < 0 && (
                <div className={styles.paywithGiftC}>
                  <div className={styles.giftCardText}>
                    <p>
                      The available amount in your Giftcard is
                      <span> ${balance}</span>
                    </p>
                    <p>
                      The total amount of your order
                      <span> ${order.totalPrice}</span> is higher than the
                      balance left in your GiftCard{" "}
                    </p>
                    <p>
                      The remaining amount is{" "}
                      <span>${Math.abs(checkBalance)}</span>.
                    </p>
                  </div>
                  <div className={styles.switchField}>
                    <input
                      type="radio"
                      id="paypal"
                      name="payMethod"
                      defaultValue="PayPal"
                      onChange={(e) => fillOrderInfo(e, "add")}
                      onClick={() => setEnablePayment(false)}
                      disabled={sharedPayment}
                    />
                    <label for="paypal">Paypal</label>
                    <input
                      type="radio"
                      id="mercadopago"
                      name="payMethod"
                      defaultValue="MercadoPago"
                      onChange={(e) => fillOrderInfo(e, "add")}
                      onClick={() => setEnablePayment(false)}
                      disabled={sharedPayment}
                    />
                    <label for="mercadopago">Credit/Debit Card</label>
                  </div>
                </div>
              )}
              {checkBalance > 0 && (
                <div className={styles.paywithGiftC}>
                  <div className={styles.giftCardText}>
                    <p>
                      The available amount in your Giftcard is
                      <span> ${balance}</span>
                    </p>
                    <p>
                      The total amount of your order is
                      <span> ${order.totalPrice}</span>
                    </p>
                    <p>
                      You have a remaining balance of{" "}
                      <span>${checkBalance}</span>
                    </p>
                  </div>
                  <button
                    className={styles.checkOut}
                    onClick={addNewOrderHandler}
                  >
                    pagar
                  </button>
                </div>
              )}
            </div>
          )}

          {chosenMethod.enable && chosenMethod.type.includes("PayPal") && (
            <Paypal
              description={`Cozy  ${date.toLocaleDateString()}`}
              catchPagoErr={catchPagoErr}
              total={!sharedPayment ? order.totalPrice : sharedPaymentPrice}
              info={info}
              addNewOrderHandler={addNewOrderHandler}
            />
          )}
          {chosenMethod.enable && chosenMethod.type.includes("MercadoPago") && (
            <PayWithCard addNewOrderHandler={addNewOrderHandler} total={!sharedPayment ? order.totalPrice : sharedPaymentPrice} catchPagoErr={catchPagoErr}/>
          )}
        </div>
        <SideProducts products={products} total={order.totalPrice} />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    loginUser: state.users.user,
  }
}

const mapDispatchToProps = {
  manageUser: userActions.manageUser,
  addNewOrder: cartActions.addNewOrder,
  getProducts: productsActions.getProducts,
  addCard: cartActions.addCard,
  getCard: cartActions.getCard,
  editCard: cartActions.editCard,
  deleteAllCartProduct: cartActions.deleteAllCartProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentGateway)
