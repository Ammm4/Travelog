import { useSelector, useDispatch } from "react-redux";

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
  
export const checkFormErrors = (data) => {
const error = {};
 const { destinationInfo, travellerInfo } = data;
 if(destinationInfo.destination.trim() === "") {
   error.destination = "Please enter the destination"
 } else if(destinationInfo.destination.trim().length > 20) {
   error.destination = "Destination must be lesser than 20 characters"
 }
 
 if(destinationInfo.country.trim() === "") {
   error.country = "Please enter the country"
 } else if(destinationInfo.country.trim().length > 20) {
   error.country = "Country must be lesser than 20 characters"
 } 

 if(destinationInfo.summary.trim() === "") {
   error.summary = "Please add a summary"
 } else if(destinationInfo.country.trim().length > 300) {
   error.summary = "Summary must be lesser than 300 characters"
 } 
 if(destinationInfo.ratings <= 0) {
   error.ratings = "Please rate your travel"
 } 
 if(!travellerInfo.travelType) {
   error.travelType ="Please add type of travel"
 }
 if(!travellerInfo.time) {
   error.time ="Please add length of travel time"
 }
 return error;
}