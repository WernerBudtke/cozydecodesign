import axios from "axios"

const productsActions = {
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
