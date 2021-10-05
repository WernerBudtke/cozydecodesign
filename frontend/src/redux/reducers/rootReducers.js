import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
});

export default rootReducer;
