import axios from "axios"

const productsActions = {
  getProducts: () => {
    return async (dispatch, getState) => {
      try {
        let res = await axios.post("http://localhost:4000/api/products", {})
        dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data.response })
        return { success: true, res: res.data.response }
      } catch (err) {
        return { success: false, res: err }
      }
    }
  },
    addProduct: (newProduct) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.post("http://localhost:4000/api/product/add", {...newProduct})
                if (response.data.success){
                    dispatch({type: "ADD_PRODUCT", payload: response.data.respose})
                }
                return response
            } catch(error) {
                return {
                    success: false, response: error
                }
            }
        }
    }
}

export default productsActions
