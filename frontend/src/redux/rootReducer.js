import { combineReducers } from "redux";
import { postReducer, singlePostReducer, addNewPostReducer } from "./posts/postReducers";
import userReducer, { singleUserReducer } from "./users/userReducers";


const rootReducer = combineReducers({
  Post: postReducer,
  User: userReducer,
  SinglePost: singlePostReducer,
  SingleUser: singleUserReducer,
  NewPost: addNewPostReducer,
})

export default rootReducer;