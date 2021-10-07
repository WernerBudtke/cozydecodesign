import axios from "axios"
import toast from "react-hot-toast"

const userActions = {
  signUp: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post("http://localhost:4000/api/user/register", user, {withCredentials: true})
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({ type: "LOG_IN_USER", payload: response.data.response })
        return {success: true, response: response.data.response}
      } catch (error) {
        return {success: false, response: error.message}
      }
    }
  },
  logFromSession: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("http://localhost:4000/api/user/validate", {withCredentials: true})
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_IN_USER", payload: response.data.response})
      } catch (error) {
        dispatch({type: "LOG_OUT"})
        await axios.get("http://localhost:4000/api/user/logout")
      }
    }
  },
  logIn: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post("http://localhost:4000/api/user/login", user, {withCredentials: true})
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_IN_USER", payload: response.data.response})
        return {success: true, response: response.data.response}
      } catch (error) {
        return {success: false, response: error.message}
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("http://localhost:4000/api/user/logout", {withCredentials: true})
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_OUT"})
        toast('See you later!', {
          icon: '👋',
        });
      } catch (error) {
        alert(error)
      }
    }
  }
}

export default userActions
