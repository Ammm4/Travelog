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
  RESET_HOME_PAGE_DATA,
  RESET_PROFILE_PAGE_DATA,
  RESET_USER_PAGE_DATA, 
  RESET_GLOBALS } from "./globalTypes";

const resetValue = {
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
const resetGlobalValues = {
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


export const setActivePage = (page) => {
  return (dispatch) => {
    dispatch( { type: ACTIVE_PAGE, payload: page })
  }
}

export const setShowModal = ( modalType ) => {
  return (dispatch) => {
    dispatch( { type: SHOW_MODAL, payload: modalType })
  }
}

export const setLoadingMessage = ( message ) => {
  return (dispatch) => {
    dispatch( { type: LOADING_MESSAGE, payload: message })
  }
}

export const setPostsUserType = ( user ) => {
  return (dispatch) => {
    dispatch( { type: POSTS_USER_TYPE, payload: user })
  }
}

export const setForumsUserType = ( user ) => {
  return (dispatch) => {
    dispatch( { type: FORUMS_USER_TYPE, payload: user })
  }
}
export const resetGlobals = () => {
   return (dispatch) => {
    dispatch( { type: RESET_GLOBALS, payload: resetGlobalValues })
  }
}
// ==================== Forum Page ============================//
export const showCreateCommentForm = ( toggle ) => {
  return (dispatch) => {
    dispatch({ type: SHOW_CREATE_COMMENT, payload: toggle })
  }
}
// =================== POST PAGE ================================== //
export const setPostDetails = ( details ) => {
  return (dispatch) => {
    dispatch( { type: POST_DETAILS, payload: details })
  }
}
//============================== Home Page ==============================================//
export const setShowPostHome = (bool) => {
  return (dispatch) => {
    dispatch( { type: HOME_SHOW_POST, payload: bool })
  }
}

export const setHomePostMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_HOME_POST_MARKER_ID, payload: id })
  }
}

export const setHomeForumMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_HOME_FORUM_MARKER_ID, payload: id })
  }
}

export const resetHomePageData = () => {
  return (dispatch) => {
    dispatch({ type: RESET_HOME_PAGE_DATA, payload: resetValue})
  }
}
//==============================   Profile Page =========================================//
export const setShowPostProfile = (bool) => {
  return (dispatch) => {
    dispatch( { type: PROFILE_SHOW_POST, payload: bool })
  }
}

export const setProfilePostMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_PROFILE_POST_MARKER_ID, payload: id })
  }
}

export const setProfileForumMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_PROFILE_FORUM_MARKER_ID, payload: id })
  }
}

export const resetProfilePageData = () => {
  return (dispatch) => {
    dispatch({ type: RESET_PROFILE_PAGE_DATA, payload: resetValue})
  }
}
//============================= User Page ======================================//
export const setShowPostUser = (bool) => {
  return (dispatch) => {
    dispatch( { type: USER_SHOW_POST, payload: bool })
  }
}

export const setUserPostMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_USER_POST_MARKER_ID, payload: id })
  }
}

export const setUserForumMarkerId = (id) => {
  return (dispatch) => {
    dispatch( { type: SET_USER_FORUM_MARKER_ID, payload: id })
  }
}

export const resetUserPageData = () => {
  return (dispatch) => {
    dispatch({ type: RESET_USER_PAGE_DATA, payload: resetValue})
  }
}
