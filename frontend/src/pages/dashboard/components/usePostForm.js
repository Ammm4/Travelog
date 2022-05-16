import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialisePostEditInfo } from '../../../redux/globals/globalActions';

export default function usePostForm() {
  const { Globals : { showModal : { action, post } } }= useSelector(state => state); 
  const { postLoading: postEditing, success } = useSelector(state => state.Post);
  const dispatch = useDispatch();
  
  useEffect(() => {
   if(!post || action === 'create post') return;
   const { images, destinationInfo, travellerInfo, recommendations } = post;
   const initialPostEditData = {
       images: images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName})),
       imgPreview: images.map(image => ({ public_id: image.img_id, imgFile: image.imgURL, imgTitle : image.imgName})),
       deletedImageIds: [],
       destinationInfo: {
         destination: destinationInfo.destination, 
         country: destinationInfo.country, 
         summary: destinationInfo.summary,
         ratings: destinationInfo.ratings
       },
       travellerInfo: {
         travelType: travellerInfo.travelType, 
         time: travellerInfo.time
       },
       recommendations: {
         numOfDays:recommendations.numOfDays,
         daysSummary: recommendations.daysSummary,
         budget:recommendations.budget, 
         budgetSummary:recommendations.budgetSummary,
         places: recommendations.places,
         heritages: recommendations.heritages,
         todos: recommendations.todos,
         others:recommendations.others 
       }
     }
    dispatch(initialisePostEditInfo(initialPostEditData))
  }
  ,[post, action, dispatch]);

  return (
    { 
      postEditing,
      success,
    }
  )
}




