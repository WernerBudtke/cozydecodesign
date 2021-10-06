const initialState = {
  token: null,
  firstName: null,
  photo: null,
  owner: null,
  admin: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      console.log(action.payload)
      return {
        ...action.payload
      }
    case "LOG_OUT": 
    return initialState
    default:
      return state
  }
}
export default usersReducer
