import axios from "axios"

const adminUsersActions = {
  getUsers: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("https://cozydeco.herokuapp.com/api/users", {withCredentials: true})
        if (!response.data.success) throw new Error("Can't fetch users")
        dispatch({ type: "GET_USERS", payload: response.data.response })
        return {success: true, response: response.data.response}
      } catch (error) {
        return {success: false, response: error.message}
      }
    }
  },
  manageAdmin: (id, token, action) => {
    return async () => {
      try {
        let response = await axios.put("https://cozydeco.herokuapp.com/api/user/admin/manage", {userToChange: id, actionToDo: !action}, {
        headers: {
          Authorization: 'Bearer ' +  token
        },
        withCredentials: true
        })
        if (response.data.success) {
          return response.data
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default adminUsersActions
