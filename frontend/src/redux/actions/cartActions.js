import axios from "axios"

const cartActions = {
  addCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "ADD_CART_PRODUCT", payload: obj })
    }
  },
  deleteACartProduct: (id) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_ONE_CART_PRODUCT", payload: id })
    }
  },
  updateCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "UPDATE_CART_PRODUCT", payload: obj })
    }
  },
  deleteCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_CART", payload: obj })
    }
  },
}

export default cartActions
