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
  border-radius: 8px;
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
