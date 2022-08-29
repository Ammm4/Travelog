import axios from "axios";
const GET_LIKES_REQUEST = "GET_LIKES_REQUEST";
const GET_LIKES_SUCCESS = "GET_LIKES_SUCCESS";
const GET_LIKES_ERROR = "GET_LIKES_ERROR";
export const RESET_LIKES = "RESET_LIKES";

export const getLikes = (type,id) => {
  return async(dispatch) => {
     dispatch({ type: GET_LIKES_REQUEST });
     try {
       const { data } = await axios.get(`/api/v1/likes?type=${type}&id=${id}`);
       dispatch({ type: GET_LIKES_SUCCESS, payload: data })
     } catch(error) {
       dispatch({type:GET_LIKES_ERROR, payload: error.response.data.error || error.message})
     }
   } 
}
export const likeReducer = ( state = { likes: [] }, action) => {
  switch(action.type){
    case GET_LIKES_REQUEST:
      return {
        ...state,
        likesLoading: true
      }
    case GET_LIKES_SUCCESS:
      return {
        ...state,
        likesLoading: false,
        likes: [...state.likes, ...action.payload.likes]
      }
     case GET_LIKES_ERROR:
      return {
        ...state,
        likesLoading: false,
        error: action.payload
      }
    case RESET_LIKES:
      return {
        likes: []
      } 
    default:
       return state;
  }
}