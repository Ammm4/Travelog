import React from 'react';
import { PostForumWrapper, PostAuthor, PostInteractions } from '../GlobalComponents/StyledComponents/Containers';
import { AuthLink } from '../GlobalComponents/StyledComponents/Link';
import { Title, Avatar, Author, LikeComment, Footer, FooterComponent, FooterName1, FooterName2, FooterNumber } from './SkeletonElements';
import DeletedBlogHeadings from '../GlobalComponents/Components/DeletedBlogHeadings';
export default function ForumSkeleton({ deleted, forumMarkerRef }) {
  if(deleted) return (
    <PostForumWrapper ref={forumMarkerRef}>
       <DeletedBlogHeadings  blogType='Forum'/>
       <PostAuthor>
         <div>
           <Title />     
         </div>
         <AuthLink to='#'>
             <Avatar />
             <Author />
         </AuthLink>
       </PostAuthor>
      <PostInteractions>
        <LikeComment style={{display: 'inline-block', marginRight: '0.25rem'}}/>
        <LikeComment style={{display: 'inline-block'}}/>
      </PostInteractions>
      <Footer>
        <FooterComponent>
          <FooterNumber />
          <FooterName1 />
        </FooterComponent>
        <FooterComponent>
          <FooterNumber />
          <FooterName2/>
        </FooterComponent>
        <FooterComponent>
          <FooterNumber />
          <FooterName1 />
        </FooterComponent>
      </Footer>
    </PostForumWrapper>
  )
  return (
    <PostForumWrapper>
       <PostAuthor>
         <div>
           <Title className='skeleton-loading'/>     
         </div>
         <AuthLink to='#'>
             <Avatar className='skeleton-loading'/>
             <Author className='skeleton-loading'/>
         </AuthLink>
       </PostAuthor>
      <PostInteractions>
        <LikeComment style={{display: 'inline-block', marginRight: '0.25rem'}} className='skeleton-loading'/>
        <LikeComment style={{display: 'inline-block'}} className='skeleton-loading'/>
      </PostInteractions>
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
