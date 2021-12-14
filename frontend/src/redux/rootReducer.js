import { combineReducers } from "redux";
import { postReducer } from "./posts/postReducers";
import userReducer from "./users/userReducers";


const rootReducer = combineReducers({
  Posts: postReducer,
  User: userReducer,
})

export default rootReducer;