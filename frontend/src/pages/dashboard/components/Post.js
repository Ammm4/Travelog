import React, { useState, } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';

// Components
import PostDetails from './PostDetails';




export const sharedBtnCss = css`
  display: inline-block;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #021b41;
`
export const PostWrapper = styled.article`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: ${props => props.singlePost ? '0' : '0 0 2rem 0' };
  padding: ${props => props.singlePost ? '4rem 0 0 0' : '12px' };
  background-color: #fff;
  box-shadow:${props => props.singlePost ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)' };
  cursor:pointer;
  overflow: auto;
  @media only screen and (max-width: 600px) {
     padding: ${props => props.singlePost ? '0 0 2.75rem 0' : '12px' };
     box-shadow: none;
     border-radius: 0;
     border-top: 1px solid #e0e0e0;
     border-bottom: 1px solid #e0e0e0;
  }
`
export const AvatarImage = styled.img`
  src: ${props => props.src};
  display: inline-block;
  width: 35px;
  height: 35px;
 
  margin: 0 0.3rem 0 0.35rem;
`
export const AuthorName = styled.span`
 font-weight: 600;
`
export const PostAuthor = styled.div`
  margin-bottom: 0.75rem;
  letter-spacing: 1px;
  border-bottom: 1px solid #efeff0; 
  div {
    display: flex;
    justify-content: space-between;
  }
`
export const AuthLink = styled(Link)`
 text-decoration: none;
 display: flex;
 align-items: center;
 color: #021b41;
`
export const PostTitle = styled.div`
 h4, p {
   margin-bottom: 0.5rem;
 }
 h4 {
   font-size: 0.96rem;
 }
 p {
   font-size: 0.9375rem;
   line-height: 1.3333;
 }
`
export const CommentsAndLikes = styled.div`
  margin-bottom: 0.75rem;
  button {
    padding-right: 0.75rem;
    font-size: 0.95rem;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
      color: #2a78cd;
    }
  }
`
export const TotalComments = styled(Link)`
  display: inline-block;
  color: inherit;
  text-decoration: none;
  `
export const TotalLikes = styled(Link)`
  display: inline-block;
  color: inherit;
  margin-right: 1rem;
  text-decoration: none; 
`

export const PostInteractions = styled.div`
margin: 0.55rem 0;
text-align: right;
cursor: pointer;
`
export const InteractionButton = styled.button`
  font-size: 1.5rem;
  display: inline-block;
  margin-right: 18px;
`

export const CommentPost = styled.div` 
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  img {
    align-self: end;
  }
  textarea {
        width: 99%;
        height: 35px;
        padding: 8px;
        resize: none;
        border: 1px solid #888;
        font-family: inherit;
        font-size: 0.9rem;
        border-radius: 2px;
        letter-spacing: 1px;
        &:focus {
          outline: none;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.5)
        }
     }
     button {
        display: inline-block;
        background-color: #0275d8;
        color: #fff;
        min-height: 35px;
        max-height: 35px;
        border-radius: 2px;
        font-weight: 600;
        cursor: pointer;
        align-self: end;
        &:disabled {
          background-color: #f1f1f1;
          color: #aaa;
        }
     } 
     @media only screen and (max-width: 600px) {
      position: ${props => props.singlePost ? 'fixed': 'sticky'};
      width:100%;
  } 
`

export const PostComments = styled.div`
  padding: 8px;
`

export const ActionContainer = styled.div`
  position: relative;
`

export const DeleteButton = styled.button`
  ${sharedBtnCss}
  font-size: 1.8rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${ props => props.showSubmenu ? '#f0f0f0' : 'transparent'};
  color: ${ props => props.showSubmenu ? '#747682' : '#021b41'};
  &:hover {
    color: ${ props => props.showSubmenu ? '#ee0000' : '#747682'};
    background-color: ${ props => props.showSubmenu ? 'transparent' : '#f0f0f0'};
  }
`

export const Line = styled.span`
  display: inline-block;
  width: 50px;
  height: 2px;
  margin-right: 0.5rem;
  vertical-align: middle;
  background-color: #f1f1f1;
`
export const LinkToPostDetails = styled(Link)`
  text-decoration: none;
  color: #021b41;
`

const PostImg = styled.img`
  display:inline-block;
  height: 35px;
  width: 35px;
  margin: 0.15rem;
`
export const Button = styled.button`
  ${sharedBtnCss}
  display: inline-block;
  margin-left: 0.3rem;
  color: #2a78cd;
  letter-spacing: 1px;
  cursor:pointer;
  font-size: 0.835rem;
  &:hover {
    color:#2e5c99;
  }
`
export default function Post({ post, setModal, singlePost }) {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  let summary = showMore ? post.destinationInfo.summary : post.destinationInfo.summary.slice(0, 150);
  return (
        <PostWrapper singlePost={singlePost}>
          <CommonHeader post={ post } setModal={setModal}/>
          <LinkToPostDetails to={`${location.pathname}/posts/${post.post_id}`}>
          <PostTitle>
            <h4>Summary </h4> 
            { post.destinationInfo.ratings 
                &&
                <Rating
                  ratingValue={ post.destinationInfo.ratings }
                  iconsCount={5}
                  allowHalfIcon={true}
                  size={15}
                  readonly={true}
                  style={{marginTop: '-0.5rem'}}
                />
              }    
            <p> { summary }
                {post.destinationInfo.summary.length > 150 && <Button onClick= { () => setShowMore(!showMore)}> { showMore ? 'less...' :'more...'}</Button>}</p>   
          </PostTitle>
           <PostTitle>
             <h4>Images ({post.images.length})</h4>
             {post.images.map((img) => {
               return <PostImg key={img.imgURL} src={img.imgURL} alt="pic" />
             })}
           </PostTitle>
          <PostTitle>
            <h4>Recommendations</h4>    
          </PostTitle>    
          { <PostDetails data={ post }/> }          
        </LinkToPostDetails>
    </PostWrapper>
  )
}

/* 
<PostAuthor>
            <div>
              <InfoHeader>
                { post.destinationInfo.destination }, { post.destinationInfo.country }
              </InfoHeader>
               { post.author.authorId === user.userId && 
                <ActionContainer>
                  <DeleteButton onClick={() => setShowSubmenu(!showSubmenu)} showSubmenu={showSubmenu}>
                    { showSubmenu ? <IoClose /> : <BiDotsHorizontalRounded /> }
                  </DeleteButton>
                  <Submenu showSubmenu={showSubmenu}>
                    <button onClick={ (e) => setModal({ postId: post.post_id, action: 'Edit Post' }) }><AiFillEdit /> Edit </button>
                    <span></span>
                    <button onClick={ (e) => setModal({ postId: post.post_id, action: 'delete' })}><MdDelete /> Delete </button>
                  </Submenu>
                </ActionContainer>
               }
            </div>
            <AuthLink to={ `${ url }/users/${ post.author.authorId }` }>
              <span>By </span><AvatarImage src={ post.author.authorAvatar } alt="avatar"/>
              <AuthorName>{ post.author.authorName }</AuthorName>
            </AuthLink>
            { post.destinationInfo.ratings 
                &&
                <Rating
                  ratingValue={ post.destinationInfo.ratings }
                  iconsCount={5}
                  allowHalfIcon={true}
                  size={22}
                  readonly={true}
                  style={{marginTop: '0.65rem'}}
                />
              } 
          </PostAuthor>





<CommentPost singlePost={singlePost}>
                <AvatarImage src={ user.avatarURL } alt="avatar" />
                <textarea 
                  placeholder="Got a question??, Ask John!"
                  disabled={true}
                />
                <button 
                 disabled={true}
                >
                  Post
                </button>        
            </CommentPost> 
            
     { 
               post.comments.length > 0 && 
                 <PostComments>
                   <Line/>
                   <Button disabled={true}>
                     { post.comments.length } { post.comments.length === 1 ? 'Comment' : 'Comments' }
                   </Button>
                </PostComments>
             }       
            <PostInteractions>
                 <InteractionButton 
                  >
                   { 
                     post.likes.find(like => like.user_id === user.userId) ? 
                     <AiFillHeart /> 
                     :
                     <AiOutlineHeart /> 
                   } 
                 </InteractionButton> 
                 <InteractionButton 
                   disabled={true}  >
                  <FaComments/> 
                 </InteractionButton> 
              </PostInteractions>
            <Button 
              onClick={ () => setShowInfo(!showInfo) } > 
              <BsFillInfoCircleFill/> { showInfo ? 'Less Info... ': 'More Info...' }
            </Button>
            { 
            <PostImages images={ post.images } postId={ post.post_id } />
          } 
          <CommentsAndLikes>
                 { post.likes.length > 0 && 
                   <div >
                     <span className="number_container">{ post.likes.length }</span> 
                     <span>{ post.comments.length ===  1 || 0 ? 'like' :  'likes' }</span>
                   </div>
                 }
                 { post.comments.length > 0 &&
                   <div > 
                    <span className="number_container">{ post.comments.length }</span>
                    <span>{ post.comments.length ===  1 || 0 ? 'comment' :  'comments' }</span>
                   </div>
                 }
          </CommentsAndLikes>  
            
            */