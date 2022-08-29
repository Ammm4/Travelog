export const loginInputs = ['email','password'];
export const signUpInputs = ['username', 'email', 'password', 'confirmpassword'];
export const destinationInputs = [
  { inputName: 'destination', title:'Name of Place', description: 'Barcelona, Venice, Porto...' },
  { inputName: 'country', title:'Country', description: 'Italy, Greece, France...' },
  ];
export const changePasswordInputs = [
  { inputName: 'oldPassword', title: 'Old Password', description: 'Enter Old Password' },
  { inputName: 'newPassword', title: 'New Password', description: 'Enter New Password' },
  { inputName: 'confirmPassword', title: 'Confirm Password', description: 'Enter New Password Again' },
  ];
const timeOptions = ['1 night', '2 to 3 nights', '4 to 6 nights', 'One week', '1 to 2 weeks', '3 weeks', 'One month', '2 to 3 months', 'More than 3 months']
export const recommendationsFormSelect = ['Select Time to Spend', ...timeOptions];
export const travelFormSelect = [
  { 
    optionName: 'travelType',
    options: ['Select Type', 'Solo Travel', 'Travel with Friends', 'Family Travel', 'Travel with Group', 'Luxury Travel', 'Adventure Travel', 'Business Travel']
  },
  {
    optionName: 'time',
    options: ['Select Time', ...timeOptions]
  }
];
export const recommendationsFormArrays = [
  { inputName: 'heritages', title: 'Heritages To Visit', description: 'Athens, Stonehenge...' },
  { inputName: 'places', title: 'Places To See', description: 'Toledo, Venice...' },
  { inputName: 'todos', title: 'Things To Do', description: 'Surfing, Bus Tour...' },
  ];
export const BtnArray = [
  {
    name: 'No. of Days to Stay',
    btnType: 'days'
  },
  {
    name: 'Budget',
    btnType: 'budget'
  },
  {
    name: 'Places To Visit',
    btnType: 'places'
  },
  {
    name: 'Heritages To See',
    btnType: 'heritages'
  },
  {
    name: 'Things To Do',
    btnType: 'todos'
  },
  {
    name: 'Others',
    btnType: 'others'
  }
]
export const profileInputs = [
  { 
    name: 'username',
    title: 'Username',
    description: 'Add your username',
    inputType: 'text'
  },
  { 
    name: 'email',
    title: 'Email',
    description: 'Add your email',
    inputType: 'email'
  },
  { 
    name: 'city',
    title: 'City',
    description: 'Add your city',
    inputType: 'text'
  },
  { 
    name: 'country',
    title: 'Country',
    description: 'Add a Country',
    inputType: 'text'
  }
];

export const profileTextAreas = [
  { 
    name: 'about',
    title: 'About',
    description: 'Add Something About You',
  },
   { 
    name: 'hobbies',
    title: 'Hobbies',
    description: 'Add Your Hobbies',
  },
  
]
// ========================= NavBar ========================== //
export const homeNavbar = {
  activePage: 'home', 
  menuBar: false, 
  showCreateMenu: false, 
  showAddBtn: true
}

export const profileNavbar = {
  ...homeNavbar,
  activePage: 'profile', 
}
export const userNavbar = {
  activePage: 'user', 
  menuBar: false, 
  showCreateMenu: false, 
  showAddBtn: false
}
export const postNavbar = {
  ...userNavbar,
  activePage: 'post', 
}
export const forumNavbar = {
  ...userNavbar,
  activePage: 'forum', 
}
// ========================= NavBar ========================== //
// ========================= Global Reducer Reset==============//
export const resetPostValue = () => {
  return {
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
}
export const resetHomePageValue = () => {
  return {
    showPost: true,
    showCreate: true,
    userType:'allUsers',
    postMarkerId: null,
    forumMarkerId: null,
 }
}
 

export const resetProfilePageValue = () => {
  return {
    showPost: true,
    showCreate: true,
    postMarkerId: null,
    forumMarkerId: null,
    showSettings: false,
    userType:null
  }
}

export const resetUserPageValue = () => {
  return {
    showPost: true,
    postMarkerId: null,
    forumMarkerId: null,
    showCreate: false,
    userType:null,
  }
}

export const resetGlobalValues = () => {
  return {
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
  homePage: resetHomePageValue(),
  profilePage: resetProfilePageValue(),
  userPage:resetUserPageValue(),
  postInfo: resetPostValue(),
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
  loadingMsg:'',
 }
}


