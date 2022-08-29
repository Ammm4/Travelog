import React from 'react';
import { useReduxDispatch } from '../../../../utils';
import { BtnGroup } from '../GlobalComponents/StyledComponents/Containers';
import { DeleteButton } from '../GlobalComponents/StyledComponents/Buttons';
import { setShowModal } from '../../../../redux/globals/globalActions';

export default function ForumFormBtn({ handleSubmit }) {
  const dispatch = useReduxDispatch();
  return (
    <BtnGroup>
      <DeleteButton onClick={ (e) => handleSubmit(e) }>Submit</DeleteButton>
      <DeleteButton onClick={ () => dispatch(setShowModal(null)) }> Cancel</DeleteButton>
    </BtnGroup>
  )
}


