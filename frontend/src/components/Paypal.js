import { useEffect, useRef } from "react"

const Paypal = (props) => {
  const paypal = useRef()
  useEffect(() => {
    if (window.myButton) window.myButton.close()
    window.myButton = window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: props.description,
              amount: {
                value: props.total,
                currency_code: "USD",
              },
            },
          ],
        })
      },
      onApprove: async (data, actions) => {
        await actions.order.capture()
        console.log("entro al on aprove")

        //   props.history.push("/")
      },
      onError: (err) => {
        alert("Hubo un error!")
        console.log(err)
      },
    })
    window.myButton.render(paypal.current)
  })

  return <div ref={paypal}></div>
}

export default Paypal
