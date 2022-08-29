import styled from "styled-components";
import { InfoHeader } from "../GlobalComponents/StyledComponents/Headings";
import { AvatarImage, PostImg } from '../GlobalComponents/StyledComponents/Images'
export const Title = styled(InfoHeader)`
  width: 50%;
  height: 1.35rem;
  background-color: #ccc;
  border-radius: 5px;
`
export const SubTitle = styled.div`
  width: 35%;
  margin-bottom: 0.5rem;
  height: 0.96rem;
  background-color: #ccc;
  border-radius: 5px;
`
export const User = styled.div`
  margin: 1rem 0 0.75rem 0;
  display: flex;
  align-items: center;
`
export const Avatar = styled(AvatarImage)`
  background-color: #ddd;
  border-radius: 50%;
`
export const Author = styled.span`
  display: inline-block;
  width: 100px;
  height: 1.2rem;
  background-color: #ccc;
  border-radius: 5px;
`
export const Thumbnail = styled(PostImg)`
  background-color: #ddd;
  border-radius: 5px;
`
export const Text = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background-color: #ddd;
`
export const Footer = styled.div`
  margin: 1rem 1.2rem 1rem 0;
  display: flex;
`
export const FooterComponent = styled.div`
  height: 55px;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const FooterNumber = styled.div`
  width: 21px;
  height: 33px;
  border-radius: 8px;
  background-color: #ddd;
`
export const FooterName1 = styled.div`
  width: 45px;
  height: 13px;
  background-color: #ddd;
  border-radius: 6px;
`
export const FooterName2 = styled.div`
  width: 65px;
  height: 13px;
  border-radius: 6px;
  background-color: #ddd;
`
export const Box = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`
export const LikeComment = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #ddd
`
export const CommentText = styled.div`
  width: 99%;
  height: 38px;
  border-radius: 5px;
  background: #ddd;
`
export const SkeletonForumCommentContainer = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 35px auto;
  gap: 0.5rem;
  border-bottom: 1px solid #021b41;
  padding: 6px 0 8px 6px;
`