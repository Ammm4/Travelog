import { 
  GET_POSTS_REQUEST, 
  GET_POSTS_SUCCESS, 
  GET_POSTS_ERROR 
} from "./postTypes";

import axios from 'axios';

const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQUEST
  }
} 

const getPostsSuccess = ( posts ) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts
  }
} 

const getPostsError = ( error ) => {
  return {
    type: GET_POSTS_ERROR,
    payload: error
  }
} 

export const getPosts = () => {
  return (dispatch) => {
     dispatch(getPostsRequest());
     axios.get('/api/v1/posts')
     .then(response => dispatch(getPostsSuccess(response.data.posts)))
     .catch(error => dispatch(getPostsError(error.message)))
  }
 
}