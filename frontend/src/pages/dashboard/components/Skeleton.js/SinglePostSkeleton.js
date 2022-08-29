import React from 'react';
import CommentSkeleton from './CommentSkeleton';
import { SinglePostContainer, 
  ImageGridWrapper, 
  SinglePostImagesContainer, 
  SinglePostImagesBtnGroup, 
  NoImgContainer, 
  PostContainer,
  PostAuthor, 
  PostBody,
  PostTitle,
  PostInteractions,
  PostComments
}  from '../GlobalComponents/StyledComponents/Containers';
import { Button } from '../GlobalComponents/StyledComponents/Buttons';
import { AuthLink } from '../GlobalComponents/StyledComponents/Link';
import PageNotFound from '../../../../GlobalComponents/Components/PageNotFound';
import { IoIosImages } from "react-icons/io";
import { Title, Avatar, Author, SubTitle, Text, LikeComment, Footer, FooterComponent, FooterName1, FooterName2 } from './SkeletonElements';
import { BsFillStarFill } from 'react-icons/bs';
export default function SinglePostSkeleton({ loading }) {
  if(!loading) return <PageNotFound msg='Something Went wrong' home='/dashboard'/>
  return (
    <SinglePostContainer>
       <ImageGridWrapper>
         <SinglePostImagesContainer>
           <NoImgContainer>
             <IoIosImages style={{color: '#fff', fontSize: '6rem'}}/>
             <p>Images</p>  
           </NoImgContainer>
           <SinglePostImagesBtnGroup>
             {[1,2].map(n => <Button key={n}><span className='close-btn'></span></Button>  )}
          </SinglePostImagesBtnGroup>
          <Button><span className='next-btn'></span></Button>
         </SinglePostImagesContainer>
       </ImageGridWrapper>
       <PostContainer>
         <div className='post_top_part'>
           <PostAuthor>
            <div>
              <Title className='skeleton-loading'/>
            </div>
            <AuthLink>
              <Avatar className='skeleton-loading'/>
              <Author className='skeleton-loading'/>
            </AuthLink>
        </PostAuthor>
        <PostBody>
          <PostTitle>
            <SubTitle />
            {[1,2,3,4,5].map(n => <BsFillStarFill style={{color: '#ddd'}} key={n}/>)}
            <Text style={{height: '50px'}} className='skeleton-loading'/>
          </PostTitle>
        </PostBody>
        <PostInteractions>
          <LikeComment style={{display: 'inline-block'}} className='skeleton-loading'/>
          <LikeComment style={{display: 'inline-block'}} className='skeleton-loading'/>
        </PostInteractions>
        <Footer>
          <FooterComponent>
            <FooterName1 className='skeleton-loading'/>
          </FooterComponent>
          <FooterComponent>
            <FooterName2 className='skeleton-loading'/>
          </FooterComponent>
        </Footer>
        </div>
        <PostComments>
          {[1,2,3].map(n => <CommentSkeleton key={n} />)}
        </PostComments>
       </PostContainer>
    </SinglePostContainer>
  )
}
