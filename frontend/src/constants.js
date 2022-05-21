export const loginInputs = ['email','password'];
export const signUpInputs = ['username', 'email', 'password', 'confirmpassword'];
export const destinationInputs = ['destination', 'country'];
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
export const recommendationsFormArrays = ['heritages','places','todos'];
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

