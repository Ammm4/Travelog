import { useEffect } from "react";
import { useReduxSelector, useReduxDispatch } from "../../../utils";
import { getSingleUser } from "../../../redux/users/userActions";

export default function useProfile(userId) {
  const { SingleUser: { loading, singleUser: user, error } } = useReduxSelector();
  const dispatch = useReduxDispatch()
  useEffect(() => {
    dispatch(getSingleUser(userId));
  },[ dispatch, userId ])
  return(
    {
      loading, 
      user, 
      error
    }
  )
}