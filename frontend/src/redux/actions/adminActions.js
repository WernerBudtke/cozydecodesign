import axios from "axios"

const adminUsersActions = {
  getUsers: (loggedUser) => {
      console.log(loggedUser)
    return async (dispatch) => {
      let response = await axios.get("http://localhost:4000/api/users", {withCredentials: true})
      if (response.data.success) {
        dispatch({ type: "GET_USERS", payload: response.data.response })
        return response.data
      }
    }
  }
}

export default adminUsersActions
