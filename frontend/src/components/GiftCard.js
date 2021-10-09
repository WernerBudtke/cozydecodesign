import styles from "../styles/GiftCard.module.css"
import Paypal from "../components/Paypal"
import MercadoPagoForm from "../components/MercadoPago/MercadoPagoForm"
import { useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const GiftCard = ({ getCard, total }) => {
  const [enableButton, setEnableButton] = useState(false)
  const [code, setCode] = useState(null)
  const [balance, setBalance] = useState(null)
  const fillCode = (e) => {
    setCode({ code: e.target.value })
  }
  const getCardHandler = () => {
    setEnableButton(true)
    getCard(code).then((res) => {
      if (res.success) {
        setBalance(res.res.balance)
      } else {
        setEnableButton(false)
        setBalance("Tu tarjeta no es valida")
      }
    })
  }

  return (
    <div>
      <label>Enter your Giftcard Code</label>
      <input
        type="text"
        required
        name="giftCardCode"
        defaultValue=" "
        onChange={fillCode}
      />
      <button onClick={getCardHandler}>Check balance</button>
      {balance && <p>{balance}</p>}
    </div>
  )
}

const mapDispatchToProps = {
  getCard: cartActions.getCard,
}

export default connect(null, mapDispatchToProps)(GiftCard)
