import styled, { css } from 'styled-components';

const sharedEditBtnCss = css`
    display: inline-block;
    position: absolute;
    display: flex;
    text-align: center;
    outline: none;
    padding: 6px;
    border: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    background-color: #7f7f7f;
    border-radius: 5px;
    color: #fff;
`
const sharedBtnCss = css`
  border-radius: 50%; 
  height: 48px;
  width: 48px;
  padding: 12px;
  z-index: 2223;
  background-color: #888;
  transition: 1s all ease;
  &:hover {
     background-color: #eee
   }
`
export const sharedDivCss = css`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  font-size: 1rem;
  margin: 1rem auto 1.5rem auto;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`
export const commonWrapperCss = css`
  margin: 5rem auto 2rem auto;
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  background-color: #fff; 
`
const commonDivStyles = css`
  position: absolute;
  top:0;
  left:0;
  z-index: 2222;
  overflow:hidden;
  padding: 0 2rem ;
  height: 100%;
  width: 100%;
  background-color: #111111;
`
export const UserAvatar = styled.div`
   position: absolute;
   top: 55%; left:50%;
   width: 120px;
   height: 120px;
   transform: translate(-50%,-50%);
   border-radius: 50%;
   background-color: #eee;
   border: 6px solid #fff;
   overflow: hidden;
   button {
     ${sharedEditBtnCss}
     bottom:5%; left:50%;
     transform: translateX(-50%); 
   }
`
export const UserCover = styled.div`
  position: relative;
  width: 100%;
  height: 55%;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  
  button {
    ${sharedEditBtnCss}
    top:0.35rem;
    left:0.35rem;
  }
`
export const UserImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`
export const UserProfile = styled.div`
  ${sharedDivCss}
  width: 100%;
  background-color: #fff;
  cursor:pointer;
  margin: 40px auto 0 auto;
  overflow: hidden;
`
export const UserInfo = styled.div`
  padding: 20px 14px;
  h3 {
    margin-bottom: 1rem;
  }
  div {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1rem;
    span {
     text-align: center;
     font-size: 1.5rem;
    }
  }
  p {
    line-height: 20px;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
`
export const ProfileContainer = styled.main`
  margin-top: 5.65rem;
  padding: 0 1.4rem;
  @media only screen and (max-width: 800px) {
    padding: 0 0.75rem;
  }
`
export const Wrapper = styled.div`
  width: 100%;
`
export const PostForumWrapper = styled.div`
  width: 100%;
  max-width: 615px;
  border-radius: 5px;
  margin: ${props => props.singlePost ? '0' : '0 auto 2rem auto' };
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
export const StyledParagraph = styled.p`
  whiteSpace: pre-wrap
  font-size: 0.9375rem;
  line-height: 1.3333;
  margin-bottom: 0.5rem;
`
export const PostComments = styled.div`
  padding: 8px;
  margin-right: 5px;
  border-top: 1px solid #e1e1e1;
  flex: 1 1 auto;
  overflow: auto;
`
export const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin:0;
  padding: 5.2rem 12px 12px 12px;
  background-color: #fff;
  box-shadow:'none';
  cursor:pointer;
  overflow: auto;
  .post_top_part {
    flex: 0 0 auto;
  }
  @media only screen and (max-width: 600px) {
     padding:12px 12px 2.75rem 12px;
     box-shadow: none;
  } 
  
`
export const FormGroup = styled.div`
   margin: 1.5rem auto 2rem auto;
   width: 100%;
`
export const FormGroupInput = styled.div`
  margin: 2.25rem 0;
  p {
      font-size: 0.95rem;
      margin: 0.85rem auto;
      font-style: italic; 
    }
`
export const InfoGroup = styled.div`
`
export const Infos = styled.div`
 margin-bottom: 1.5rem;
`
export const ImagePreview = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns:1fr 1fr;
  grid-column-gap: 2px;
`
export const ImagePreviewImg = styled.div`
  position: relative; 
  .remove-img {
      position: absolute;
      top: 5px; right: 5px;
      font-size: 1.5rem;
      color: #1e1e1e;
      cursor: pointer;
  }
`
export const InputWrapper = styled.div`
  margin-bottom: 0.95rem;
`
export const PostFormWrapper = styled.form`
  ${commonWrapperCss}
`
export const PostConfirmWrapper = styled.article`
  ${commonWrapperCss}
`
export const ModalContainer = styled.div`
 position: fixed;
 top:0; left:0;
 z-index: 5555;
 width: 100%;
 height: 100%;
 overflow: auto;
 background-color: rgba(0,0,0, 0.85);
`
export const SeenAllContainer = styled.div`
  width:98%;
  max-width: 615px;
  margin: 2rem auto;
`
export const PostAuthor = styled.div`
  margin-bottom: 0.75rem;
  letter-spacing: 1px; 
  div {
    display: flex;
    justify-content: space-between;
  }
`
export const PostBody = styled.main`
  display: grid;
  grid-template-columns: 1fr 30px;
  @media(max-width: 450px) {
    grid-template-rows: 1fr;
  }
`
export const PostTitle = styled.div`
 h4, p {
   margin-bottom: 0.5rem;
 }
 h4 {
   font-size: 0.96rem;
   span {
     font-weight: 400;
   }
 }
 p {
   font-size: 0.9375rem;
   line-height: 1.3333;
   margin-bottom: 0.5rem;
 }
`
export const PostInteractions = styled.div`
margin: 0.55rem 0;
text-align: right;
cursor: pointer;
`
//==================== SinglePost ==============//
export const SinglePostContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${ props => props.expand ? '1fr' : '1.35fr 0.65fr'};
  grid-template-rows: 100vh auto;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${ props => props.expand ? '100vh' : '50vh auto'};
  }
`
export const ImageGridWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #111111;
  padding: 0%;
`
export const SinglePostImagesContainer = styled.div`
 position: relative;
 width:100%;
 height: 100%;
 padding: 0 2%;
 overflow:hidden;
 .prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
 }
 .prev-btn {
   ${sharedBtnCss}
   left:0.5rem;
   &:hover {
     left: 0.25rem;
   }
 }
 .next-btn {
   ${sharedBtnCss}
   right:0.5rem;
    &:hover {
     right: 0.25rem;
   }
 }
 .close-btn {
   display: inline-block;
   margin-right: 0.5rem;
   ${sharedBtnCss}
 }
`
export const SinglePostImagesBtnGroup = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 2223;
  top: 2%;
  left: 1%;
`
export const ImgContainer = styled.div`
  ${commonDivStyles}
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 100%;
  transform: ${props => props.index === props.currentIndex ? 'translateX(0)' : props.index > props.currentIndex? 'translateX(100%)' : 'translateX(-100%)'};
  transition: 1s all ease;
  span {
    display: inline-block;
    position: absolute; 
    padding: 3px 6px;
    border-radius: 10px;
    font-size: 0.85rem;
    background-color: rgba(0,0,0,0.75);
    color: #fff;
    letter-spacing: 2px;
  }
  .image_number{
    right: 2%;
    top: 2%;
  }
  .image_name {
    left: 5px;
    bottom: 5px;
    padding: 5px 12px;
    font-size: 0.95rem;
    border-radius: 4px;
  }
`
export const NoImgContainer = styled.div`
  ${commonDivStyles}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color:#fff;
    font-size: 1.5rem;
  }
`
export const CommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-row-gap:0.08rem;
 grid-template-columns: 45px 1fr;
 font-size: 0.9rem;
 padding: 6px 0 0px 6px;
 line-height: 20px;
`
export const CommentBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
`

//=============== Single Forum ====
export const ForumContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: 70px auto 15px auto;
   border-bottom: 1px solid #021b41;
`
export const ForumCommentsContainer = styled.div`
   width: 100%;
   max-width: 750px;
   margin: auto;
`

export const ForumCommentContainer = styled.div`
 margin-bottom: 0.5rem;
 display: grid;
 grid-template-columns: 45px 1fr 85px;
 grid-template-rows: 35px auto;
 row-gap: 5px;
 padding: 6px 0 0px 6px;
 line-height: 20px;
 border-bottom: 1px solid #021b41;
 p {
   grid-column-start: 2;
   grid-column-end: 4;
 }
 .btn-container {
   grid-column-start: 3;
   grid-column-end: 4;
 }
`
//=============================== Comments and Comment =================== //
export const AuthorName = styled.span`
 display: flex;
 align-items: center;
 font-weight: 600;
`
export const CommentInteractionBar = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;  
`
export const CommentText = styled.div`
  display: ${ props => props.isEdit ? 'none' : 'block' };
  background-color: #f1f1f1;
  font-size: 0.825rem;
  padding: 8px;
  border-radius: 2px;
  letter-spacing: 1px;
`
export const CommentLike = styled.div`
  font-size: 0.95rem;
  padding: 8px;
  display: flex;
  align-items: center;
`
export const DeleteContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  padding: 10px;
  width: 98%;
  max-width: 800px;
  background-color: #fff;
  p {
    margin: 2rem 0;
    color:#004684;
    font-size: 1.15rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: .5px;
  }
`
export const BtnGroup = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 2rem auto;
`
export const GoBackContainer = styled.div`
  padding: 0.2rem 0 0 0.2rem;
  z-index: 5;
`

export const ReplyCommentContainer = styled.div`
  width:100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  margin: 0.75rem 0;
  img {
    align-self: end;
  }
`
export const GridItemContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`

export const ReplyContainer = styled.div`
  margin-top: 0.1rem;
  display: grid;
  grid-row-gap:0.08rem;
  grid-template-columns: 32px 1fr;
  font-size: 0.9rem;
  padding: 6px 0 0px 6px;
  line-height: 20px;
`
export const ForumDescription = styled.p`
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 2px;
  letter-spacing: 1px;
`
