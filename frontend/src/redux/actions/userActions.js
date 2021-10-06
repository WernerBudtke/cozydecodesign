import axios from "axios"

const userActions = {
  signUp: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "http://localhost:4000/api/user/register",
          user
        )
        response.data.success && console.log(response)
        // dispatch({ type: "LOG_IN_USER", payload: response.data }) -- VER TEMA SESIONES
        return response
      } catch (error) {
        console.log(error)
      }
    }
  },
  logFromSession:()=>{
    return()=>{
        console.log('vermos la conec')
    }
}
}

export default userActions
