import { combineReducers } from "redux";
import { postReducer, singlePostReducer } from "./posts/postReducers";
import { forumsReducer, forumReducer } from "./forums/forumReducers";
import userReducer, { singleUserReducer } from "./users/userReducers";
import { globalReducers } from "./globals/globalReducers";


const rootReducer = combineReducers({
  Post: postReducer,
  User: userReducer,
  Forums: forumsReducer,
  SinglePost: singlePostReducer,
  SingleUser: singleUserReducer,
  Forum: forumReducer,
  Globals: globalReducers
})

export default rootReducer;