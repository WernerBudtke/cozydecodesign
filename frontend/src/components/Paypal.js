import { useEffect, useRef } from "react"

const Paypal = ({description, total, order , addNewOrderHandler }) => {
  const paypal = useRef()
  useEffect(() => {
    if (window.myButton) window.myButton.close()
    window.myButton = window.paypal.Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  value: total,
                  currency_code: "USD",
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          await actions.order.capture()
          addNewOrderHandler()
        },
        onError: (err) => {
          alert("Hubo un error!")
        },
      })
      window.myButton.render(paypal.current)
  })

  return <div ref={paypal}></div>
}

export default Paypal
