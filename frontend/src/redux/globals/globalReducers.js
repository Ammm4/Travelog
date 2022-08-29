import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  SET_NAV_BAR,
  SET_NAV_BAR_ITEMS,
  SET_HOME_PAGE,
  RESET_HOME_PAGE,
  SET_PROFILE_PAGE,
  RESET_PROFILE_PAGE,
  SET_USER_PAGE,
  RESET_USER_PAGE,
  SET_SIGN_UP_DATA,
  RESET_SIGN_UP_DATA,
  SET_LOGIN_DATA,
  RESET_LOGIN_DATA,
  SET_RESET_PASSWORD,
  SET_SHOW_SCROLL_UP_BUTTON,
  RESET_GLOBALS,
  INITIALISE_POST_EDIT_INFO,
  INITIALISE_USER_EDIT_INFO,
  SET_SHOW_FORM,
  EDIT_USER_INFO,
  EDIT_POST_INFO,
  RESET_POST_INFO,
  SET_FORUM_FORM,
  INITIALISE_FORUM_FORM,
  RESET_CHANGE_PASSWORD_DATA,
} from "./globalTypes";

let initialState = { 
  navBar: {
    activePage: null,
    menuBar: false,
    showAddBtn: false,
    showCreateMenu: false,
  },
  signUpData : {
    username:'', 
    email:'', 
    password:'', 
    confirmpassword:'',
    errors:''
  },
  loginData : {
    email: '',
    password: '',
    errors: ''
  },
  resetPassword: {
    btnAbled: true,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    errors: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  homePage: {
    showPost: true,
    showCreate: true,
    userType:'allUsers',
    postMarkerId: null,
    forumMarkerId: null,
  },
  profilePage: {
   showPost: true,
   showCreate: true,
   showSettings: false,
   userType:null,
   postMarkerId: null,
   forumMarkerId: null,
  },
  userPage: {
    showPost: true,
    showCreate: false,
    userType:null,
    postMarkerId: null,
    forumMarkerId: null,
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
  forumForm: {
    title: '',
    body:''
  },
  showScrollUpBtn: false,
  showCreateComment: false,
  showModal: null,
 };

export const globalReducers = ( state = initialState, action) => {
  switch (action.type) {
    case SHOW_CREATE_COMMENT:
      return {
        ...state,
        showCreateComment: action.payload
      }
    case SET_SHOW_SCROLL_UP_BUTTON:
      return {
        ...state,
        showScrollUpBtn: action.payload
      }
    //================= Nav Bar ==============//
    case SET_NAV_BAR:
      return {
        ...state,
        navBar: action.payload 
      }
    case SET_NAV_BAR_ITEMS:
      return {
        ...state,
        navBar: { ...state.navBar, [action.payload.name] : action.payload.value }
      }
    //=================== Nav Bar ==========================//
    //=================== Home Page ============================//
    case SET_HOME_PAGE: 
      return {
        ...state,
        homePage: { ...state.homePage, [action.payload.name] : action.payload.value }
      }
    case RESET_HOME_PAGE: 
      return {
        ...state,
        homePage: action.payload
      }
    //==================== Home Page ==================================//
    //======================== Profile Page ===========================//
    case SET_PROFILE_PAGE: 
      return {
        ...state,
        profilePage: { ...state.profilePage, [action.payload.name] : action.payload.value }
      }
    case RESET_PROFILE_PAGE: 
      return {
        ...state,
        profilePage: action.payload
      }
    //======================== Profile Page ===========================//
     //======================== User Page ===========================//
    case SET_USER_PAGE: 
      return {
        ...state,
        userPage: { ...state.userPage, [action.payload.name] : action.payload.value }
      }
    case RESET_USER_PAGE: 
      return {
        ...state,
        userPage: action.payload
      }
    //======================== User Page ===========================//
    case INITIALISE_USER_EDIT_INFO:
      return {
        ...state,
        userInfo: action.payload
      }
    case INITIALISE_POST_EDIT_INFO:
      return {
        ...state,
        postInfo: action.payload
      }
    case SET_SHOW_FORM:
      return {
        ...state,
        showModal: {...state.showModal, [action.payload.name]: action.payload.value}
      }
    case EDIT_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, [action.payload.name]: action.payload.value }
      }
    case EDIT_POST_INFO:
      return {
        ...state,
        postInfo: { ...state.postInfo, [action.payload.name]: action.payload.value }
      }
    case RESET_POST_INFO:
      return {
        ...state,
        postInfo: action.payload
      }
    case SET_FORUM_FORM:
      return{
        ...state,
        forumForm: { ...state.forumForm, [action.payload.name]: action.payload.value }
      }
    case INITIALISE_FORUM_FORM:
      return{
        ...state,
        forumForm: action.payload
      }
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
     case SET_SIGN_UP_DATA:
      return {
        ...state,
        signUpData: {...state.signUpData, [action.payload.name] : action.payload.value}
      }
     case RESET_SIGN_UP_DATA: 
     return {
       ...state,
       signUpData: action.payload
     }
     case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: {...state.loginData, [action.payload.name] : action.payload.value}
      }
     case RESET_LOGIN_DATA: 
     return {
       ...state,
       loginData: action.payload
     }
     case SET_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: { ...state.resetPassword, [action.payload.name] : action.payload.value }
      }
    case RESET_CHANGE_PASSWORD_DATA:
      return {
        ...state,
        resetPassword: action.payload
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


    
    