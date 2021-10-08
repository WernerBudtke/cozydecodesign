const cartReducer = (state = { products: [] }, action) => {
  let cartLS = null
  switch (action.type) {
    case "ADD_CART_PRODUCT":
      cartLS = [...state.products, action.payload ]
      localStorage.setItem("cart", JSON.stringify(cartLS))
      return {
        products: state.products.concat(action.payload),
      }
    case "DELETE_ONE_CART_PRODUCT":
      cartLS = state.products.filter(
        (obj) => obj.product._id !== action.payload
      )
      localStorage.setItem("cart", JSON.stringify(cartLS))
      return {
        products: state.products.filter(
          (obj) => obj.product._id !== action.payload
        ),
      }
    case "UPDATE_CART_PRODUCT":
      cartLS = state.products.map((obj) =>
        obj.product._id === action.payload.product._id
          ? { ...obj, quantity: action.payload.quantity }
          : obj
      )
      localStorage.setItem("cart", JSON.stringify(cartLS))
      return {
        products: state.products.map((obj) =>
          obj.product._id === action.payload.product._id
            ? { ...obj, quantity: action.payload.quantity }
            : obj
        ),
      }
    case "ADD_CART_LS":
      console.log(action.payload)
      return{
        products:action.payload
      }
    default:
      return state
  }
}
export default cartReducer