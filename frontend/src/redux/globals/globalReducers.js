import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  POST_DETAILS, 
  LOADING_MESSAGE, 
  POSTS_USER_TYPE,
  FORUMS_USER_TYPE,
  HOME_SHOW_POST,
  SET_HOME_POST_MARKER_ID,
  SET_HOME_FORUM_MARKER_ID,
  PROFILE_SHOW_POST,
  SET_PROFILE_POST_MARKER_ID,
  SET_PROFILE_FORUM_MARKER_ID,
  USER_SHOW_POST,
  SET_USER_POST_MARKER_ID,
  SET_USER_FORUM_MARKER_ID,
  ACTIVE_PAGE,
  RESET_GLOBALS,
  RESET_HOME_PAGE_DATA,
  RESET_PROFILE_PAGE_DATA,
  RESET_USER_PAGE_DATA
} from "./globalTypes";

let initialState = {
  showCreateComment: false,
  activePage: 'home',
  showModal: null,
  postDetails: null,
  loadingMsg:'',
  postsUserType:'allUsers',
  forumsUserType:'allUsers',
  homePageData : {
    showPost: true,
    post: {
      postMarkerId: null,
      pageNumber: 1,
    },
    forum: {
     forumMarkerId: null,
     pageNumber: 1
    }
  },
  profilePageData : {
    showPost: true,
    post: {
      postMarkerId: null,
      pageNumber: 1,
    },
    forum: {
     forumMarkerId: null,
     pageNumber: 1
    }
  },
  userPageData : {
    showPost: true,
    post: {
      postMarkerId: null,
      pageNumber: 1,
    },
    forum: {
     forumMarkerId: null,
     pageNumber: 1
    }
  }
}

export const globalReducers = ( state = initialState, action) => {
  switch (action.type) {

    case ACTIVE_PAGE: 
      return {
        ...state,
        activePage: action.payload,
      }
    case SHOW_CREATE_COMMENT:
      return {
        ...state,
        showCreateComment: action.payload
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
    case POST_DETAILS:
      return {
        ...state,
        postDetails: action.payload
      }
    case LOADING_MESSAGE: 
      return {
        ...state,
        loadingMsg: action.payload
      }
    case POSTS_USER_TYPE: 
      return {
        ...state,
        postsUserType: action.payload
      }
    case FORUMS_USER_TYPE: 
      return {
        ...state,
        forumsUserType: action.payload
      }
    case HOME_SHOW_POST:
      return {
        ...state,
        homePageData: { ...state.homePageData, showPost: action.payload }
      }
    case SET_HOME_POST_MARKER_ID:
      return{
        ...state,
        homePageData: { ...state.homePageData, post: { ...state.homePageData.post, postMarkerId:action.payload} }
      }
    case SET_HOME_FORUM_MARKER_ID:
      return{
        ...state,
        homePageData: { ...state.homePageData, forum: { ...state.homePageData.forum, forumMarkerId:action.payload} }
      }
    case PROFILE_SHOW_POST:
      return {
        ...state,
        profilePageData: { ...state.profilePageData, showPost: action.payload }
      }
    case SET_PROFILE_POST_MARKER_ID:
      return {
        ...state,
        profilePageData: { ...state.profilePageData, post: { ...state.profilePageData.post, postMarkerId: action.payload}}
      }
    case SET_PROFILE_FORUM_MARKER_ID:
      return {
        ...state,
        profilePageData: { ...state.profilePageData, forum: { ...state.profilePageData.forum, forumMarkerId: action.payload}}
      }
    case USER_SHOW_POST:
      return {
        ...state,
        userPageData: { ...state.userPageData, showPost: action.payload }
      }
    case SET_USER_POST_MARKER_ID:
      return {
        ...state,
        userPageData: { ...state.userPageData, post: { ...state.userPageData.post, postMarkerId: action.payload}}
      }
    case SET_USER_FORUM_MARKER_ID:
      return {
        ...state,
        userPageData: { ...state.userPageData, forum: { ...state.userPageData.forum, forumMarkerId: action.payload}}
      }
    case RESET_HOME_PAGE_DATA: {
      return {
        ...state,
        homePageData: action.payload
      }
    }
    case RESET_PROFILE_PAGE_DATA: {
      return {
        ...state,
        profilePageData: action.payload
      }
    }
    case RESET_USER_PAGE_DATA: {
      return {
        ...state,
        userPageData: action.payload
      }
    }
    case RESET_GLOBALS: {
      return {
        ...state, ...action.payload
      }
    }
       default:
    return state
  }
}