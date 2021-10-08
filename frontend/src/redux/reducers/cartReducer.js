const cartReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "ADD_CART_PRODUCT":
      return {
        products: state.products.concat(action.payload),
      }
    case "DELETE_ONE_CART_PRODUCT":
      return {
        products: state.products.filter(
          (obj) => obj.product._id != action.payload
        ),
      }
    case "UPDATE_CART_PRODUCT":
      return {
        products: state.products.map((x) =>
          x.product._id === action.payload.product._id
            ? { ...x, quantity: action.payload.quantity }
            : x
        ),
      }
    default:
      return state
  }
}
export default cartReducer
