import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import validator from "validator";
import { SET_SHOW_FORM } from "./redux/globals/globalTypes";
import { initialiseForumForm, resetGlobals, resetPostInfo, setShowModal, setResetPassword } from "./redux/globals/globalActions";
import { RESET_FORUMS } from "./redux/forums/forumTypes";
import { RESET_POSTS } from "./redux/posts/postTypes";
import { RESET_LIKES } from "./redux/likes";
export const useReduxDispatch = () => useDispatch();
export const useReduxSelector = () => useSelector(state => state);
export const useReactLocation = () => useLocation();

export const infoRequiredToDisplay = (data) =>{
  let requiredInfo = [];
  let displayRecommendations = false;
  const { numOfDays, 
    daysSummary, 
    budget,
    budgetSummary, 
    heritages, 
    places, 
    todos, 
    others } = data;

if(( numOfDays !== 'Select Time to Spend') || ( daysSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('days')
}

if ( (!isNaN(budget) && budget > 0 ) || (budgetSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('budget')
}
if (heritages.filter(item => item !== '' && item.trim() !== '').length > 0 ) {
  displayRecommendations = true
  requiredInfo.push('heritages')
}
if (places.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('places')
}
if (todos.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('todos')
}
if (others.trim() !== '') {
  displayRecommendations = true
  requiredInfo.push('others')
}
return { requiredInfo, displayRecommendations }
}
// ============== Post Form Errors ===================== //
export const checkFormErrors = (data) => {
const error = {};
 const { 
   destinationInfo: { destination, country, summary, ratings }, 
   travellerInfo: { travelType, time } 
  } = data;
 if(destination.trim() === "" || destination.trim().length > 20) {
   error.errorMarker = 'destination';
   let message = destination.trim() === '' ? 'Please enter the destination' : 'Destination must be lesser than 20 characters'
   error.destination = message;
 } 
 
 if(country.trim() === "" || country.trim().length > 20) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'country';
   let message = country.trim() === '' ? 'Please enter the country' : 'Country must be lesser than 20 characters';
   error.country = message
 } 

 if(summary.trim() === "" || summary.trim().length > 300) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'summary';
   let message = summary.trim() === '' ? 'Please add a summary' : 'Summary must be lesser than 300 characters'
   error.summary = message;
 } 
 if(ratings <= 0) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'ratings';
   error.ratings = "Please rate your travel"
 } 
 if(travelType === 'Select Type') {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'travelType';
   error.travelType ="Please add type of travel"
 }
 if(time === 'Select Time') {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'time';
   error.time ="Please add length of travel time"
 }
 return error;
}

// ================= Login Errors =================== //
export function checkLoginErrors(email,password) {
   let errors = {};
   if(!email && !password) {
     errors.email = true;
     errors.password = true;
     errors.message = 'Enter your e-mail address and password';
     return errors
   }
   if(!email) {
     errors.email = true;
     errors.message = 'Enter your e-mail address';
     return errors
   }
    if(!password) {
     errors.password = true;
     errors.message = 'Enter your password';
     return errors
   }
   return errors
 }

 // ==================== Sign Up Errors ==================== //
 export const checkSignUpErrors = (data) => {
 const error = {};
 const { username, email, password, confirmpassword } = data;
 if(username.trim() === '' || username.trim().length < 4 || username.trim().length > 30) {
   error.errorMarker = 'username';
   let message = username.trim() === "" ? 'Username must be provided!' : username.trim().length < 4 ? 'Username must be greater than 4 characters' : 'Username must be lesser than 12 characters';
   error.username = message
 } 
 if(email === '' || !validator.isEmail(email)) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'email';
   let message = email === '' ? 'Please provide an email!' : 'Please provide a valid email!'
   error.email = message
 } 
 if(password.trim() === '' || password.trim().length < 8 || password.trim().length > 30 ) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'password';
   let message = password.trim() === '' ? 'Password must be provided!' : password.trim().length < 8 ? 'Username must be greater than 8 characters!' : 'Username must be lesser than 30 characters!';
   error.password = message
 } 
 if(confirmpassword === "" || confirmpassword !== password) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'confirmPassword';
   let message = confirmpassword === '' ? 'Please confirm your password!' : 'Passwords do not match!';
   error.confirmpassword = message
 } 
 return error;
}
export const postsCommentEditandDelete = (posts, payload, value) => {
  return posts.map(post => {
         if(post._id === payload.postId) {
           let newComments = post.comments.map(comment => {
             if(comment._id === payload.commentId) {
               return { ...comment, ...value }
           }
            return comment
          })
            return {...post, comments: newComments}
          }
         return post
       })
}
export const postsCommentFetchandAdd = (posts, payload, value) => {
  return posts.map(post => {
         if(post._id === payload.postId) {
           return {...post, ...value }
         }
        return post
        })    
}
export const postsCommentReplyEditandDelete = (posts, payload, value) => {
  return posts.map(post => {
    if(post._id === payload.postId) {
      let newComments = commonReplyEditandDelete(post.comments, payload, value)
      return {...post, comments: newComments}
    }
    return post
  })
}

export const postsCommentReplyFetchandAdd = (posts, payload, value) => {
  return posts.map(post => {
        if(post._id === payload.postId) {
           let newComments = commonReplyFetchAndAdd(post.comments, payload, value)
           return { ...post, comments: newComments }
        }
       return post
      })
}

export const postCommentEditandDelete = (comments,payload,value) => {
  return comments.map(comment => {
         if(comment._id === payload.commentId) {
           return {...comment, ...value}
         }
         return comment
       })
}

export const commonLikeComment = (comments, payload) => {
  return comments.map(comment => {
          if(comment._id === payload.Like.comment){
             return { ...comment, isLiked: payload.Liked, numLikes: payload.Liked ? comment.numLikes + 1 :  comment.numLikes - 1}
           }
           return comment
         })
}
export const commonLikeReply = (comments, payload) => {
  return comments.map(comment => {
           if(comment._id === payload.commentId){
             let newReplies = comment.replies.map(reply => {
              if (reply._id ===  payload.Like.reply) {
                return {...reply, isLiked: payload.Liked, numLikes: payload.Liked ? reply.numLikes + 1 : reply.numLikes - 1}
              } 
              return reply
             })
             return { ...comment, replies: newReplies }
           }
           return comment
      })
}

export const commonGetReplies = (comments,payload) => {
  return comments.map(comment => {
        if(comment._id === payload.commentId) {
          let newReplies = payload.replies.filter(reply => !comment.replies.some(item => item._id === reply._id))
          return {...comment, replyLoading: false, replies: [ ...comment.replies, ...newReplies]}
        }
        return comment
      })
}
export const commonAddReply = (comments,payload) => {
  return comments.map(comment => {
    if(comment._id === payload.reply.comment) { 
      return { ...comment, addingReply: false, numReplies: comment.numReplies + 1, replyBody: '', replies: [ payload.reply, ...comment.replies ]}
    }
    return comment
  })
}

export const commonLikeBlog = ( blog, payload) => {
  return { ...blog, isLiked: payload.Liked, numLikes: payload.Liked ? blog.numLikes + 1 : blog.numLikes - 1 }
}

export const commonReplyFetchAndAdd = (comments, payload, value) => {
   return comments.map(comment => {
     if(comment._id === payload.commentId) {
       return {...comment, ...value }
     }
     return comment
   })
}

export const commonReplyEditandDelete = (comments, payload, value) => {
  return comments.map(comment => {
        if(comment._id === payload.commentId) {
          let newReplies = comment.replies.map(reply => {
            if(reply._id === payload.replyId) {
              return { ...reply, ...value }
            }
            return reply
          })
          return { ...comment, replies: newReplies }
        }
        return comment
       })
}

export const commonReplyDeleteSuccess = (comments,payload) => {
  return comments.map(comment => {
    if(comment._id === payload.reply.comment) {
        let newReplies = comment.replies.filter(reply => reply._id !== payload.reply._id)
       return { ...comment, numReplies: comment.numReplies - 1, replies: newReplies }
     }
     return comment
    })
}

export const requestDispatch = (dispatch, message) => {
  dispatch({ type: SET_SHOW_FORM, payload: { name: 'actionMessage', value: message } });
}

export const handleModalClose = (dispatch, type) => {
  if(type === 'forumModal') {
    dispatch(initialiseForumForm({ title: '', body: '' }))
  } else if(type === 'postModal') {
    dispatch(resetPostInfo())
  } else {
    dispatch({ type: RESET_LIKES })
  }
  dispatch(setShowModal(null))
}

export const handleModalClick = (e, dispatch, type) => {
  if(e.target.classList.contains('modal')) {
      return handleModalClose(dispatch,type);
    }
}

export const resetAll = (dispatch) => {
  dispatch(resetGlobals());
  dispatch({ type: RESET_FORUMS});
  dispatch({ type: RESET_POSTS })
}

export const handleShowLikes = ( dispatch, type, id) => {
   dispatch(setShowModal({ modalType: 'likes', type, id })) 
  }

export const handleChangePassword = (e, dispatch, resetPassword, oldPassword) => {
  const { newPassword, confirmPassword, btnAbled, errors } = resetPassword;
  let disableBtn = btnAbled;
    dispatch(setResetPassword(e.target.name, e.target.value))
    if(e.target.name === 'newPassword') {
      if(e.target.value.trim().length < 8) {
        disableBtn = true;
        let message = 'Password must be more than 7 characters';
        dispatch(setResetPassword('errors', {...errors, newPassword: message }))
      } else {
        let message = e.target.value !== confirmPassword ? 'Passwords do not match' : '';
        disableBtn = message !== '' || !oldPassword.trim();
        dispatch(setResetPassword('errors', {...errors, newPassword: '', confirmPassword: message})) 
      } 
    } else if(e.target.name === 'confirmPassword') {
       let message = e.target.value !== newPassword ? 'Passwords do not match' : '';
       disableBtn = message !== '' || newPassword.trim().length < 8 || !oldPassword.trim();
       dispatch(setResetPassword('errors', {...errors, confirmPassword: message }))
    } else if(e.target.name === 'oldPassword'){
       disableBtn = !e.target.value.trim() || newPassword.length < 8 || confirmPassword !== newPassword;
    }
    dispatch(setResetPassword('btnAbled', disableBtn ))
}