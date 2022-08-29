import React,{ useEffect } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import Asterisk from '../../../../GlobalComponents/Components/Asterisk';
import { BtnGroup } from '../GlobalComponents/StyledComponents/Containers';
import { InputLabel, InputElement, TextArea } from '../GlobalComponents/StyledComponents/Inputs';
import { setForumForm, initialiseForumForm } from '../../../../redux/globals/globalActions';

export default function ForumForm() {
  const { Globals: { showModal: { forum }, 
           forumForm: { title, body } } 
        } = useReduxSelector();

  const dispatch = useReduxDispatch();
  useEffect(() => {
    if(forum) {
     dispatch(initialiseForumForm({ title: forum.title, body: forum.body ? forum.body : '' }))
    }
  },[dispatch, forum])
  return (
    <>
      <BtnGroup>
         <InputLabel htmlFor='title'>Title <Asterisk /></InputLabel>
         <InputElement 
           type="text"
           value={ title }
           name="title" 
           id="title"
           onChange={(e) => dispatch(setForumForm('title',e.target.value))}/>
         </BtnGroup>
         <BtnGroup>
         <InputLabel htmlFor='body'><i>Description(optional)</i></InputLabel>
         <TextArea
           value={ body }
           name="body" 
           id="body"
           onChange={(e) => dispatch(setForumForm('body', e.target.value))}/>
         </BtnGroup>
    </>
  )
}
