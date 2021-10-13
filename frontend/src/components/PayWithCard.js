import Card from 'react-credit-cards'
import { useState } from 'react';
import '../styles/PayWithCard.css'
import {connect} from 'react-redux'
import cartActions from '../redux/actions/cartActions';
const INITIAL_STATE = {
    cvc: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    focus: "cardNumber",
    cardholderName: "",
    cardNumber: "",
    issuer: "",
}
const PayWithCard = ({addNewOrderHandler, catchPagoErr, payWithCreditCard}) => {
    const [state, setState] = useState(INITIAL_STATE)
    const [fetching, setFetching] = useState(false)
    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        })
    }
    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name })
    }
    const payWithCCard = async () => {
        try{
            setFetching(true)
            let res = await payWithCreditCard()
            if(!res.success)throw new Error('Payment failed')
            addNewOrderHandler()
        }catch(e){
            catchPagoErr()
        }
    }
    return(
        <div className="formContainer">
            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                brand={state.issuer}
                
            />
            {fetching && <p>Processing payment... please wait!</p>}
            {!fetching && <div className="form">
                <div className="spacedInputs">
                    <label htmlFor="cardNumber">Card number:</label>
                    <input type="text" name="cardNumber" id="cardNumber" placeholder="Card Number" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={19}/> {/*numero tarjeta*/}
                </div>
                <div className="spacedInputs">
                    <label htmlFor="cardholderName">Full name:</label>
                    <input type="text" name="cardholderName" id="cardholderName" placeholder="Full Name" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={17}/> {/*titular*/}
                </div>
                <div className="groupedInputs">
                    <label htmlFor="cvc">CVC:</label>
                    <input type="text" name="cvc" id="cvc" placeholder="CVC" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={4}/> {/*cvc*/}
                    <label htmlFor="cardExpirationMonth">Month:</label>
                    <input type="text" name="cardExpirationMonth" placeholder="MM" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={2}/> {/*mes venc*/}
                    <label htmlFor="cardExpirationYear">Year:</label>
                    <input type="text" name="cardExpirationYear" placeholder="YY" onChange={handleInputChange} onFocus={handleInputFocus} maxLength={2}/> {/*ano venc*/}
                </div>
            </div>}
            {!fetching && <button onClick={payWithCCard}>Complete Payment</button>}
        </div>
    )
}
const mapDispatchToProps = {
    payWithCreditCard: cartActions.payWithCreditCard
}
export default connect(null, mapDispatchToProps)(PayWithCard)