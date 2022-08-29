import React from 'react';
import ForumForm from './forumForm';
import ForumFormBtn from './forumFormBtn';
import { PostFormWrapper } from '../GlobalComponents/StyledComponents/Containers';
import { PostTitle } from '../GlobalComponents/StyledComponents/Headings';
export default function Form({ title, handleSubmit, showForm }) {
  if(showForm) return <></>
  return (
    <PostFormWrapper>
      <PostTitle> { title } </PostTitle>
      <ForumForm />
      <ForumFormBtn handleSubmit={handleSubmit}/>
    </PostFormWrapper>
  )
}
