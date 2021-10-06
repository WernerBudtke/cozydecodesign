import axios from "axios"

const userActions = {
  signUp: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post("http://localhost:4000/api/user/register", user)
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({ type: "LOG_IN_USER", payload: response.data.response })
        return response
      } catch (error) {
        alert(error)
      }
    }
  },
  logFromSession: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("http://localhost:4000/api/user/validate")
        console.log(response)
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_IN_USER", payload: response.data.response})
      } catch (error) {
        console.log(error)
        dispatch({type: "LOG_OUT"})
        await axios.get("http://localhost:4000/api/user/logout")
      }
    }
  },
  logIn: (user) => {
    console.log(user)
    return async (dispatch) => {
      try {
        let response = await axios.post("http://localhost:4000/api/user/login", user, {withCredentials: true})
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_IN_USER", payload: response.data.response})
        return response
      } catch (error) {
        alert(error)
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      try {
        let response = axios.get("http://localhost:4000/api/user/logout")
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({type: "LOG_OUT"})
      } catch (error) {
        alert(error)
      }
    }
  }
}

export default userActions
