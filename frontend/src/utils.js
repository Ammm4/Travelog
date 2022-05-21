import { useSelector, useDispatch } from "react-redux";
import validator from "validator";

export const useReduxDispatch = () => useDispatch();

export const useReduxSelector = () => useSelector(state => state);

export const infoRequiredToDisplay = (data) =>{
  let requiredInfo = [];
  let displayRecommendations = false;
  const { numOfDays, 
    daysSummary, 
    budget,
    budgetSummary, 
    heritages, 
    places, 
    todos, 
    others } = data;

if(( numOfDays !== '') || ( daysSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('days')
}

if ( (!isNaN(budget) && budget > 0 ) || (budgetSummary.trim() !== '')) {
  displayRecommendations = true
  requiredInfo.push('budget')
}
if (heritages.filter(item => item !== '' && item.trim() !== '').length > 0 ) {
  displayRecommendations = true
  requiredInfo.push('heritages')
}
if (places.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('places')
}
if (todos.filter(item => item !== '' && item.trim() !== '').length > 0  ) {
  displayRecommendations = true
  requiredInfo.push('todos')
}
if (others.trim() !== '') {
  displayRecommendations = true
  requiredInfo.push('others')
}
return { requiredInfo, displayRecommendations }
}
// ============== Post Form Errors ===================== //
export const checkFormErrors = (data) => {
const error = {};
 const { 
   destinationInfo: { destination, country, summary, ratings }, 
   travellerInfo: { travelType, time } 
  } = data;
 if(destination.trim() === "" || destination.trim().length > 20) {
   error.errorMarker = 'destination';
   let message = destination.trim() === '' ? 'Please enter the destination' : 'Destination must be lesser than 20 characters'
   error.destination = message;
 } 
 
 if(country.trim() === "" || country.trim().length > 20) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'country';
   let message = country.trim() === '' ? 'Please enter the country' : 'Country must be lesser than 20 characters';
   error.country = message
 } 

 if(summary.trim() === "" || summary.trim().length > 300) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'summary';
   let message = summary.trim() === '' ? 'Please add a summary' : 'Summary must be lesser than 300 characters'
   error.summary = message;
 } 
 if(ratings <= 0) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'ratings';
   error.ratings = "Please rate your travel"
 } 
 if(travelType === 'Select Type') {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'travelType';
   error.travelType ="Please add type of travel"
 }
 if(time === 'Select Time') {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'time';
   error.time ="Please add length of travel time"
 }
 return error;
}

// ================= Login Errors =================== //
export function checkLoginErrors(email,password) {
   let errors = {};
   if(!email && !password) {
     errors.email = true;
     errors.password = true;
     errors.message = 'Enter your e-mail address and password';
     return errors
   }
   if(!email) {
     errors.email = true;
     errors.message = 'Enter your e-mail address';
     return errors
   }
    if(!password) {
     errors.password = true;
     errors.message = 'Enter your password';
     return errors
   }
   return errors
 }

 // ==================== Sign Up Errors ==================== //
 export const checkSignUpErrors = (data) => {
 const error = {};
 const { username, email, password, confirmpassword } = data;
 if(username.trim() === '' || username.trim().length < 4 || username.trim().length > 30) {
   error.errorMarker = 'username';
   let message = username.trim() === "" ? 'Username must be provided!' : username.trim().length < 4 ? 'Username must be greater than 4 characters' : 'Username must be lesser than 12 characters';
   error.username = message
 } 
 if(email === '' || !validator.isEmail(email)) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'email';
   let message = email === '' ? 'Please provide an email!' : 'Please provide a valid email!'
   error.email = message
 } 
 if(password.trim() === '' || password.trim().length < 8 || password.trim().length > 30 ) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'password';
   let message = password.trim() === '' ? 'Password must be provided!' : password.trim().length < 8 ? 'Username must be greater than 8 characters!' : 'Username must be lesser than 30 characters!';
   error.password = message
 } 
 if(confirmpassword === "" || confirmpassword !== password) {
   if(!error.hasOwnProperty('errorMarker')) error.errorMarker = 'confirmPassword';
   let message = confirmpassword === '' ? 'Please confirm your password!' : 'Passwords do not match!';
   error.confirmpassword = message
 } 
 return error;
}
