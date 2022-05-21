import { 
  //=== Navbar ==== //
  SET_MENU_BAR,
  SET_CREATE_MENU,
  // ==== Modal === //
  SHOW_MODAL,
  SET_SHOW_POST_FORM,
  //==== 
  SHOW_CREATE_COMMENT, 
  LOADING_MESSAGE,
  // ==== Page ==== //
  SET_PAGE_INITIAL_STATE,
  SET_PAGE_DATA_SHOW_POST,
  SET_PAGE_DATA_POST_MARKER_ID,
  SET_PAGE_DATA_FORUM_MARKER_ID,
  SET_PAGE_DATA_SHOW_SETTINGS,
  // ==== Sign Up ==== //
  SET_SIGN_UP_DATA,
  RESET_SIGN_UP_DATA,
  // ==== Login ==== //
  SET_LOGIN_DATA,
  RESET_LOGIN_DATA,
  // ===== Post Form === //
  INITIALISE_POST_EDIT_INFO,
  EDIT_POST_INFO,
  RESET_POST_INFO,
  // ======== User Form ==== //
  INITIALISE_USER_EDIT_INFO,
  EDIT_USER_INFO,
  // ======= Change Password ======= //
  SET_RESET_PASSWORD,
  // ==== UTILS ==========//
  RESET_GLOBALS,
  SET_SHOW_SCROLL_UP_BUTTON,
} from "./globalTypes";


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
      travelType: 'Select Type', 
      time: 'Select Time'
    },
    recommendations: {
      numOfDays: 'Select Time to Spend', 
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
  pageData: {
    showPost: true,
    showSettings: false,
    pageType: null,
    showCreate: null,
    postsUserType: null,
    forumsUserType:null,
    postMarkerId: null,
    forumMarkerId: null
  },
  postInfo: {
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
  },
  userInfo: {
    username: '',
    email:'',
    about:'',
    hobbies: '',
    city:'',
    country: '',
    avatarImg:'',
    coverImg:''
  },
  showScrollUpBtn: false,
  showCreateComment: false,
  showModal: null,
  loadingMsg:'',
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
export const setPageInitialState = (pageType, userType, showBtn, showCreate) => {
   let initialState = { page: pageType, userType, showBtn, showCreate }
   return (dispatch) => {
     dispatch({ type: SET_PAGE_INITIAL_STATE, payload: initialState})
   }
}
export const setPageDataShowPost = (value) => {
   return (dispatch) => {
     dispatch({ type: SET_PAGE_DATA_SHOW_POST, payload: value})
   }
}
export const setPageDataShowSettings = (value) => {
   return (dispatch) => {
     dispatch({ type: SET_PAGE_DATA_SHOW_SETTINGS, payload: value})
   }
}
export const setPageDataPostMarkerId = (value) => {
   return (dispatch) => {
     dispatch({ type: SET_PAGE_DATA_POST_MARKER_ID, payload: value})
   }
}
export const setPageDataForumMarkerId = (value) => {
   return (dispatch) => {
     dispatch({ type: SET_PAGE_DATA_FORUM_MARKER_ID, payload: value})
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
     dispatch({ type: EDIT_POST_INFO , payload: { name, value }})
   }
}
export const resetPostInfo = () => {
  return (dispatch) => {
     dispatch({ type: RESET_POST_INFO , payload: resetPostValue })
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
// ==================== Sign Up Page ================================//
export const setSignUpData = ( name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_SIGN_UP_DATA, payload: { name, value }  })
  }
}
export const resetSignUpData = () => {
  let resetValue = {
    username:'', 
    email:'', 
    password:'', 
    confirmpassword:'',
    errors:''
  }
  return (dispatch) => {
    dispatch( { type: RESET_SIGN_UP_DATA, payload: resetValue  })
  }
}

// ==================== Login Page ================================//
export const setLoginData = ( name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_LOGIN_DATA, payload: { name, value }  })
  }
}
export const resetLoginData = () => {
  let resetValue = { 
    email:'', 
    password:'', 
    errors:''
  }
  return (dispatch) => {
    dispatch( { type: RESET_LOGIN_DATA, payload: resetValue  })
  }
}
// ==================== Change Password Page ================================//
export const setResetPassword = ( name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_RESET_PASSWORD, payload: { name, value }  })
  }
}


// ==================== Forum Page ============================//
export const showCreateCommentForm = ( toggle ) => {
  return (dispatch) => {
    dispatch({ type: SHOW_CREATE_COMMENT, payload: toggle })
  }
}

