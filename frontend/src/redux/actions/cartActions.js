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
    console.log(obj)
    return (dispatch) => {
      dispatch({ type: "UPDATE_CART_PRODUCT", payload: obj })
      return { success: true }
    }
  },
  deleteAllCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_CART", payload: obj })
    }
  },
  addCartLS:(obj)=>{
    return async (dispatch)=>{
    dispatch({ type: "ADD_CART_LS", payload:obj})
    }
  }
}

export default cartActions
