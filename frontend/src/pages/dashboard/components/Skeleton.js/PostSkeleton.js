import React from 'react';

import { BsFillStarFill } from 'react-icons/bs';

import { 
  Author, 
  Avatar, 
  Footer, 
  FooterComponent, 
  FooterName1, 
  FooterName2, 
  FooterNumber, 
  SubTitle, 
  Text, 
  Thumbnail, 
  Title,
  Box,
  LikeComment,
} from './SkeletonElements';
  import { PostForumWrapper, PostAuthor, PostBody, PostTitle } from '../GlobalComponents/StyledComponents/Containers';
  import { AuthLink } from "../GlobalComponents/StyledComponents/Link";
  import DeletedBlogHeadings from '../GlobalComponents/Components/DeletedBlogHeadings';
  
  export default function PostSkeleton({ deleted, postMarkerRef }) {
  return (
    <PostForumWrapper ref={ deleted ? postMarkerRef : null }>
      { deleted ? <DeletedBlogHeadings blogType='Post'/> : <></> }
      <PostAuthor>
        <div>
          <Title className='skeleton-loading'/>
        </div>
        <AuthLink to='#'>
          <Avatar className='skeleton-loading'/>
          <Author className='skeleton-loading'/>
        </AuthLink>
      </PostAuthor>
      <PostBody>
        <div style={{ paddingRight: '20px' }}>
          <PostTitle>
            <SubTitle className='skeleton-loading'/>
          </PostTitle>
          <PostTitle>
            <SubTitle className='skeleton-loading'/>
          </PostTitle>
          <PostTitle>
            <SubTitle className='skeleton-loading'/>
            {[1,2,3,4,5].map(n => <BsFillStarFill style={{color: '#ddd'}} key={n} />)}
            <Text className='skeleton-loading'/>
          </PostTitle>
          <PostTitle>
            <SubTitle className='skeleton-loading'/>
            <Thumbnail className='skeleton-loading'/>
            <Thumbnail className='skeleton-loading'/>
            <Thumbnail className='skeleton-loading'/>
          </PostTitle>
        </div>
        <Box>
         <LikeComment />
         <LikeComment style={{marginTop: '0.25rem'}}/>
        </Box>
      </PostBody>
      
      <Footer>
        <FooterComponent>
          <FooterNumber className='skeleton-loading'/>
          <FooterName1 className='skeleton-loading'/>
        </FooterComponent>
        <FooterComponent>
          <FooterNumber className='skeleton-loading'/>
          <FooterName2 className='skeleton-loading'/>
        </FooterComponent>
        <FooterComponent>
          <FooterNumber className='skeleton-loading'/>
          <FooterName1 className='skeleton-loading'/>
        </FooterComponent>
      </Footer>
    </PostForumWrapper>
  )
}
