import { 
  //=== Navbar ==== //
  SET_NAV_BAR,
  SET_NAV_BAR_ITEMS,
  // ==== Modal === //
  SHOW_MODAL,
  SET_SHOW_FORM,
  //==== 
  SHOW_CREATE_COMMENT, 
  // ======= Homepage ========//
  SET_HOME_PAGE,
  RESET_HOME_PAGE,
  // ======= Profilepage ========//
  SET_PROFILE_PAGE,
  RESET_PROFILE_PAGE,
  // ======= Userpage ========//
  SET_USER_PAGE,
  RESET_USER_PAGE,
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
  // ======== Forum Form =====//
  SET_FORUM_FORM,
  INITIALISE_FORUM_FORM,
  // ======= Change Password ======= //
  SET_RESET_PASSWORD,
  RESET_CHANGE_PASSWORD_DATA,
  // ==== UTILS ==========//
  RESET_GLOBALS,
  SET_SHOW_SCROLL_UP_BUTTON,
} from "./globalTypes";
import { resetGlobalValues, resetPostValue, resetHomePageValue, resetProfilePageValue, resetUserPageValue } from "../../constants";

export const setShowModal = ( modalType ) => {
  return (dispatch) => {
    dispatch( { type: SHOW_MODAL, payload: modalType })
  }
}

// ======================= NavBar =============================== //
export const setNavbar = (value) => {
  return (dispatch) => {
    dispatch( { type: SET_NAV_BAR, payload: value })
  }
}
export const setNavbarItems = (name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_NAV_BAR_ITEMS, payload: { name, value } })
  }
}
// ======================= NavBar =============================== //

// ======================= Home Page =============================== //
export const setHomePage = (name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_HOME_PAGE, payload: { name, value }})
  }
}

// ======================= Home Page =============================== //

// ======================= Profile Page =============================== //
export const setProfilePage = (name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_PROFILE_PAGE, payload: { name, value }})
  }
}
export const resetProfilePage = () => {
  return (dispatch) => {
    dispatch( { type: RESET_PROFILE_PAGE, payload: resetProfilePageValue()})
  }
}
// ======================= Profile Page =============================== //

// ======================= User Page =============================== //
export const setUserPage = (name, value) => {
  return (dispatch) => {
    dispatch( { type: SET_USER_PAGE, payload: { name, value }})
  }
}


export const resetUserPage = () => {
  return (dispatch) => {
    dispatch( { type: RESET_USER_PAGE, payload: resetUserPageValue()})
  }
}
// ======================= User Page =============================== //


//=============================
export const setForumForm = (name,value) => {
  return (dispatch) => {
     dispatch({ type: SET_FORUM_FORM , payload: { name, value}})
   }
}
export const initialiseForumForm = (value) => {
   return (dispatch) => {
     dispatch({ type: INITIALISE_FORUM_FORM , payload: value})
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
export const setShowForm = (name, value) => {
  return (dispatch) => {
     dispatch({ type: SET_SHOW_FORM , payload: {name, value} })
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
     dispatch({ type: RESET_POST_INFO , payload: resetPostValue() })
   } 
}

export const setShowScrollUpBtn = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_SHOW_SCROLL_UP_BUTTON, payload: value })
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
export const setResetPassword = ( name, value ) => {
  return (dispatch) => {
    dispatch( { type: SET_RESET_PASSWORD, payload: { name, value }  })
  }
}
export const resetChangePasswordData = () => {
  let resetValue = {
    btnAbled: true,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    errors: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }
  return (dispatch) => dispatch({ type: RESET_CHANGE_PASSWORD_DATA, payload: resetValue }) 
}


// ==================== Forum Page ============================//
export const showCreateCommentForm = ( toggle ) => {
  return (dispatch) => {
    dispatch({ type: SHOW_CREATE_COMMENT, payload: toggle })
  }
}

//==================== Resets ==============================//
export const resetGlobals = () => {
   return (dispatch) => {
   dispatch( { type: RESET_GLOBALS, payload: resetGlobalValues() })
  }
}

export const resetHomePage = () => {
  return (dispatch) => {
    dispatch( { type: RESET_HOME_PAGE, payload: resetHomePageValue()})
  }
}