import { RESET_FORUMS } from "../../../../redux/forums/forumTypes";
import { resetGlobals } from "../../../../redux/globals/globalActions";
import { RESET_POSTS } from "../../../../redux/posts/postTypes";
import { useReduxDispatch } from "../../../../utils";


export default function useCommonDispatch() {
  const dispatch = useReduxDispatch();  
  const actionsToDispatch = () => {
    new Promise(resolve => resolve(dispatch(resetGlobals()))).then(() => {
       dispatch({ type: RESET_POSTS });
       dispatch({ type: RESET_FORUMS })
    })
  }
  return {
    actionsToDispatch
  }
}