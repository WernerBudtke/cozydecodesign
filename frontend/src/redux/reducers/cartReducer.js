const cartReducer = (
  state = { products: [] },
  action
) => {
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
    default:
      return state
  }
}
export default cartReducer
