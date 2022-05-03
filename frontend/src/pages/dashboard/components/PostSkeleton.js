import React from 'react';
import styled from 'styled-components';
import { PostForumWrapper } from './GlobalComponents/StyledComponents/Containers';
import { BlogDelete } from './GlobalComponents/StyledComponents/Headings';
import {AiOutlineStop} from 'react-icons/ai';

const SkeletonHeading = styled.h2`
  width: 70%;
  height: 1rem;
  margin-bottom: 0.65rem;
  border-radius: 0.25rem;
  background-color: hsl(200, 20%, 80%);
`
const SkeletonUserLogo = styled.img`
  display: inline-block;
  margin-bottom: 0.65rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: hsl(200, 20%, 80%);
`
const SkeletonUserInfo = styled.p`
 width: 50%;
 height: 0.85rem;
 margin-bottom: 0.5rem;
 border-radius: 0.25rem;
 background-color: hsl(200, 20%, 80%);
`
const SkeletonSubHeading = styled.h3`
 width: 40%;
 height: 0.85rem;
 margin-bottom: 0.5rem;
 border-radius: 0.25rem;
 background-color: hsl(200, 20%, 80%);
`
const SkeletonDetails = styled.p`
 width: 100%;
 height: 185px;
 border-radius: 0.25rem;
 margin-bottom: 0.5rem;
 background-color: hsl(200, 20%, 80%);
`
const SkeletonImages = styled.img`
 width: 40px;
 height: 40px;
 background-color: hsl(200, 20%, 80%);
`
const SkeletonFooter = styled.div`
   margin-bottom: 0.25rem;
   background-color: hsl(200, 20%, 80%);
`
const SkeletonFooterItems = styled.span`
   display: inline-block;
   margin-right: 0.5rem;
   height: 55px;
   width: 55px;
   background-color: hsl(200, 20%, 80%);
`
export default function PostSkeleton({ postMarkerRef}) {
  return (
    <PostForumWrapper ref={postMarkerRef}>
      <BlogDelete><AiOutlineStop /> POST DELETED</BlogDelete>
      <SkeletonHeading />
      <SkeletonUserLogo />
      <SkeletonUserInfo />
      <SkeletonSubHeading />
      <SkeletonDetails /> 
      <SkeletonImages />
      <SkeletonSubHeading /> 
    </PostForumWrapper>
  )
}
/* (
    <PostForumWrapper>
      <SkeletonHeading />
      <SkeletonUserLogo />
      <SkeletonUserInfo />
      <SkeletonSubHeading />
      <SkeletonDetails /> 
      <SkeletonSubHeading />
      <SkeletonImages />
      <SkeletonSubHeading />
      <SkeletonFooter />
      { ['ITEM1', 'ITEM2', 'ITEM3'].map(item => <SkeletonFooterItems key={item}/>) }
    </PostForumWrapper>
  ) */