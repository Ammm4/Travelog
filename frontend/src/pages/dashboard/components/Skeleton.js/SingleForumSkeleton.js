import React from 'react';
import { PostContainer, 
  ForumCommentsContainer,
  ForumContainer,
  PostAuthor,
  PostInteractions } from '../GlobalComponents/StyledComponents/Containers';
import { Title, Avatar, Author, LikeComment, Footer, FooterComponent, FooterNumber, FooterName1, FooterName2 } from './SkeletonElements';
import { AuthLink } from '../GlobalComponents/StyledComponents/Link';
import ForumCommentSkeleton from './ForumCommentSkeleton';
import PageNotFound from '../../../../GlobalComponents/Components/PageNotFound';
import GoBackBtn from '../GlobalComponents/Components/GoBackBtn';


export default function SingleForumSkeleton({ loading }) {
  if(!loading) return <PageNotFound msg='Something Went wrong' home='/dashboard'/>
  return (
    <PostContainer style={{ paddingTop:'0', marginBottom: '80px' }}>
      <GoBackBtn className='skeleton-loading'/> 
      <ForumContainer>
         <PostAuthor>
           <div>
             <Title className='skeleton-loading'/>       
           </div>
         <AuthLink>
             <Avatar className='skeleton-loading'/>
             <Author className='skeleton-loading'/>
          </AuthLink>
        </PostAuthor>
       <PostInteractions>
        <LikeComment style={{display: 'inline-block', marginRight:'0.3rem'}} className='skeleton-loading'/>
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
      </ForumContainer>
      <ForumCommentsContainer>
      {[1,2,3,4].map(n => <ForumCommentSkeleton key={n}/>)}
    </ForumCommentsContainer>
    </PostContainer>
  )
}
