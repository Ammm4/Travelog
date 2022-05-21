import { 
  SHOW_CREATE_COMMENT, 
  SHOW_MODAL, 
  LOADING_MESSAGE, 
  SET_PAGE_INITIAL_STATE,
  SET_PAGE_DATA_SHOW_POST,
  SET_PAGE_DATA_SHOW_SETTINGS,
  SET_PAGE_DATA_POST_MARKER_ID,
  SET_PAGE_DATA_FORUM_MARKER_ID,
  SET_SIGN_UP_DATA,
  RESET_SIGN_UP_DATA,
  SET_LOGIN_DATA,
  RESET_LOGIN_DATA,
  SET_RESET_PASSWORD,
  SET_MENU_BAR,
  SET_CREATE_MENU,
  SET_SHOW_SCROLL_UP_BUTTON,
  RESET_GLOBALS,
  INITIALISE_POST_EDIT_INFO,
  INITIALISE_USER_EDIT_INFO,
  SET_SHOW_POST_FORM,
  EDIT_USER_INFO,
  EDIT_POST_INFO,
  RESET_POST_INFO,
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
  showScrollUpBtn: false,
  showCreateComment: false,
  showModal: null,
  loadingMsg:'',
}

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
    case SET_SHOW_POST_FORM:
      return {
        ...state,
        showModal: {...state.showModal, showPostForm: action.payload}
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
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }
    case LOADING_MESSAGE: 
      return {
        ...state,
        loadingMsg: action.payload
      }
     case SET_PAGE_INITIAL_STATE: 
      return {
        ...state,
        pageData: {...state.pageData, pageType: action.payload.page, showCreate: action.payload.showCreate, postsUserType: action.payload.userType, forumsUserType: action.payload.userType },
        navBar: {...state.navBar, showAddBtn: action.payload.showBtn, activePage: action.payload.page } 
      }
     case SET_PAGE_DATA_SHOW_POST:
       return {
         ...state,
         pageData: { ...state.pageData, showPost: action.payload }
       }
     case SET_PAGE_DATA_POST_MARKER_ID:
       return {
         ...state,
         pageData:  { ...state.pageData, postMarkerId: action.payload }
       }
     case SET_PAGE_DATA_FORUM_MARKER_ID:
       return {
         ...state,
         pageData:  { ...state.pageData, forumMarkerId: action.payload }
       }
     case SET_PAGE_DATA_SHOW_SETTINGS:
       return {
         ...state,
         pageData:  { ...state.pageData, showSettings: action.payload }
       }
     case SET_MENU_BAR:
      return {
        ...state,
        navBar: { ...state.navBar, menuBar: action.payload }
      }
     case SET_CREATE_MENU: 
      return {
        ...state,
        navBar: { ...state.navBar, showCreateMenu: action.payload }
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
    case RESET_GLOBALS: {
      return {
        ...state, ...action.payload
      }
    }
       default:
    return state
  }
}


    
    