import axios from "axios"

const adminUsersActions = {
  getUsers: (loggedUser) => {
    return async (dispatch) => {
      let response = await axios.get("http://localhost:4000/api/users", {withCredentials: true})
      console.log(response)
      if (response.data.success) {
        dispatch({ type: "GET_USERS", payload: response.data.response })
        return response.data
      }
    }
  },
  manageAdmin: (id, token, action) => {
    return async () => {
      let response = await axios.put("http://localhost:4000/api/user/admin/manage", {userToChange: id, actionToDo: !action}, {
        headers: {
          Authorization: 'Bearer ' +  token
        },
        withCredentials: true
      })
      console.log(response)
      if (response.data.success) {
        return response.data
      }
    }
  }
}

export default adminUsersActions
