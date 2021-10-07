const usersReducer = (state = {user:{
  token: null,
  firstName: null,
  photo: null,
  owner: null,
  admin: null
}}, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      console.log(action.payload)
      return {
       user:{...action.payload}
      }
    case "LOG_OUT": 
    return {
      user:null
    }
    default:
      return state
  }
}
export default usersReducer
//a ver!!!