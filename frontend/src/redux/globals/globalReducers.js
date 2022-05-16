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
  
  SET_SHOW_SCROLL_UP_BUTTON,
  RESET_GLOBALS,
  RESET_HOME_PAGE_DATA,
  RESET_PROFILE_PAGE_DATA,
  RESET_USER_PAGE_DATA,
  INITIALISE_POST_EDIT_INFO,
  INITIALISE_USER_EDIT_INFO,
  SET_SHOW_POST_FORM,
  EDIT_USER_INFO,
  EDIT_POST_INFO,
  RESET_POST_INFO,
  SET_CREATE_POST_ERRORS
} from "./globalTypes";

let initialState = {
  navBar: {
    activePage: null,
    menuBar: false,
    showAddBtn: false,
    showCreateMenu: false,
  },
  showScrollUpBtn: false,
  showCreateComment: false,
  activePage: null,
  showModal: null,
  postDetails: null,
  loadingMsg:'',
  postsUserType: null,
  forumsUserType:null,
  homePageData : {
    showPost: true,
    post: {
      postMarkerId: null,
    },
    forum: {
     forumMarkerId: null,
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
  }
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
    case SET_CREATE_POST_ERRORS:
      return {
        ...state,
        postInfo: { ...state.postInfo, errors: action.payload }
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
    case SET_PAGE_INITIAL_STATE: 
      return {
        ...state,
        postsUserType: action.payload.userType,
        forumsUserType: action.payload.userType,
        navBar: {...state.navBar, showAddBtn: action.payload.showBtn, activePage: action.payload.page}
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
    case SET_SHOW_SETTINGS:
      return {
        ...state,
        profilePageData: { ...state.profilePageData, showSettings: action.payload }
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