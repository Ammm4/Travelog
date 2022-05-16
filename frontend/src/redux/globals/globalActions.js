import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  POST_DETAILS, 
  LOADING_MESSAGE, 
  SET_PAGE_INITIAL_STATE,
  SET_MENU_BAR,
  SET_CREATE_MENU,
  HOME_SHOW_POST,
  SET_HOME_POST_MARKER_ID,
  SET_HOME_FORUM_MARKER_ID,
  PROFILE_SHOW_POST,
  SET_SHOW_SETTINGS,
  SET_PROFILE_POST_MARKER_ID,
  SET_PROFILE_FORUM_MARKER_ID,
  USER_SHOW_POST,
  SET_USER_POST_MARKER_ID,
  SET_USER_FORUM_MARKER_ID,
  
  INITIALISE_POST_EDIT_INFO,
  INITIALISE_USER_EDIT_INFO,
  EDIT_USER_INFO,
  EDIT_POST_INFO,
  RESET_POST_INFO,
  SET_CREATE_POST_ERRORS,
  SET_SHOW_POST_FORM,
  RESET_HOME_PAGE_DATA,
  RESET_PROFILE_PAGE_DATA,
  RESET_USER_PAGE_DATA, 
  RESET_GLOBALS,
  SET_SHOW_SCROLL_UP_BUTTON,
} from "./globalTypes";

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
const resetPostValue = {
    images: [],
    deletedImageIDs:[],
    imgPreview: [],
    destinationInfo: {
      destination: '', 
      country: '', 
      summary: '',
      ratings: 0
    },
    travellerInfo: {
      travelType: '', 
      time: ''
    },
    recommendations: {
      numOfDays: '', 
      daysSummary:'', 
      budget: 0, 
      budgetSummary:'', 
      heritages:[''], 
      places:[''], 
      todos:[''], 
      others:''
    },
    errors: null
  }

const resetGlobalValues = {
  navBar: {
    activePage: null,
    menuBar: false,
    showAddBtn: false,
    showCreateMenu: false,
  },
  showCreateComment: false,
  activePage: null,
  showModal: null,
  postDetails: null,
  loadingMsg:'',
  postsUserType:null,
  forumsUserType:null,
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
    showSettings: false,
    post: {
      postMarkerId: null,
    },
    forum: {
     forumMarkerId: null,
    }
  },
  userPageData : {
    showPost: true,
    post: {
      postMarkerId: null,
    },
    forum: {
     forumMarkerId: null,
    }
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
export const setPageInitialState = (pageType, userType, showBtn) => {
   let initialState = { page: pageType, userType, showBtn }
   return (dispatch) => {
     dispatch({ type: SET_PAGE_INITIAL_STATE, payload: initialState})
   }
}
export const initialiseuserInfo = (data) => {
  return (dispatch) => {
     dispatch({ type: INITIALISE_USER_EDIT_INFO , payload: data})
   }
}
export const initialisePostEditInfo = (data) => {
  return (dispatch) => {
     dispatch({ type: INITIALISE_POST_EDIT_INFO , payload: data })
   }
}
export const setShowPostForm = (value) => {
  return (dispatch) => {
     dispatch({ type: SET_SHOW_POST_FORM , payload: value })
   }
}

export const editUserInfo = (name, value) => {
  return (dispatch) => {
     dispatch({ type: EDIT_USER_INFO , payload: { name, value}})
   }
}
export const editPostInfo = (name, value) => {
  return (dispatch) => {
     dispatch({ type: EDIT_POST_INFO , payload: { name, value}})
   }
}
export const resetPostInfo = () => {
  return (dispatch) => {
     dispatch({ type: RESET_POST_INFO , payload: resetPostValue })
   } 
}
export const setCreatePostErrors = (errors) => {
  return (dispatch) => {
     dispatch({ type: SET_CREATE_POST_ERRORS , payload: errors})
   }
}

export const setShowScrollUpBtn = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_SHOW_SCROLL_UP_BUTTON, payload: value })
  }
}
export const resetGlobals = () => {
   return (dispatch) => {
    dispatch( { type: RESET_GLOBALS, payload: resetGlobalValues })
  }
}
// ==================== NavBar ================================//

export const setMenubar = (value) => {
   return (dispatch) => {
    dispatch( { type: SET_MENU_BAR, payload: value  })
  }
}
export const setCreateMenu = (value) => {
   return (dispatch) => {
    dispatch( { type: SET_CREATE_MENU, payload: value  })
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

export const setShowSettings = (value) => {
  return (dispatch) => {
    dispatch( { type: SET_SHOW_SETTINGS, payload: value })
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
