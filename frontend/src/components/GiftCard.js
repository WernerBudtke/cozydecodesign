import styles from "../styles/GiftCard.module.css"
import Paypal from "../components/Paypal"
import MercadoPagoForm from "../components/MercadoPago/MercadoPagoForm"
import { useState } from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const GiftCard = ({ getCard, total, fillOrderInfoGiftC }) => {
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

  const checkBalance = typeof balance === "number" ? balance - total : null

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
      {typeof balance === "string" && <p>{balance}</p>}
      {typeof balance === "number" && (
        <p>el saldo de tu giftcard es de ${balance}</p>
      )}
      {checkBalance < 0 && (
        <>
          <p>
            el valor de tu compra ${total} supera el saldo que tienes en tu
            giftcard, el saldo que queda por pagar es de ${checkBalance * -1}.
          </p>
          <button>Pagar ahora</button>
        </>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  getCard: cartActions.getCard,
}

export default connect(null, mapDispatchToProps)(GiftCard)
