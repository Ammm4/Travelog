import React, { useRef, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { getComments, addComment } from '../../../redux/posts/postActions';
import { PostComments } from './GlobalComponents/StyledComponents/Containers';
import Loading1 from './Loading1';
import AddComment from './AddComment';


export default function Comments({ post }) {
  const { User: { user: { userId } } } = useSelector(state => state);
  const { _id: id, comments, numOfComments } = post
  const dispatch = useDispatch();
  const commentInputRef = useRef();
  /* commentInputRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    commentInputRef.current.focus(); */
  useEffect(() => {
    if(comments.length > 0 || numOfComments === 0) return;
    dispatch(getComments(id, userId))
  }, [dispatch, id, userId, comments, numOfComments])


  /* if(commentLoading) {
    <Loading1 />
  } */
  return (
    <PostComments>
       <AddComment
         post={post}
         commentInputRef={commentInputRef} 
       />
        { 
          comments.map(comment => {
            return (
                <Comment
                  key={ comment._id }       
                  comment={ comment }                           
                />
              )
          })
        }
    </PostComments>
  )
}
