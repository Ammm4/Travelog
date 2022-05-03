import { combineReducers } from "redux";
import { postsReducer, postReducer } from "./posts/postReducers";
import { forumsReducer, forumReducer } from "./forums/forumReducers";
import userReducer, { singleUserReducer } from "./users/userReducers";
import { globalReducers } from "./globals/globalReducers";


const rootReducer = combineReducers({
  Posts: postsReducer,
  User: userReducer,
  Forums: forumsReducer,
  Post: postReducer,
  SingleUser: singleUserReducer,
  Forum: forumReducer,
  Globals: globalReducers
})

export default rootReducer;