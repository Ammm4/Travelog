import React from 'react';
import { useReduxSelector } from '../../../../utils';
import { ImagePreview, ImagePreviewImg, InfoGroup } from '../GlobalComponents/StyledComponents/Containers';
import { PostFormImg } from '../GlobalComponents/StyledComponents/Images';
import { InfoLabel } from '../GlobalComponents/StyledComponents/Headings';
export default function Images() {
  const { Globals: { postInfo : { imgPreview }}} = useReduxSelector();
  return (
    <InfoGroup>
      <InfoLabel>Images({ imgPreview.length })</InfoLabel>
        <ImagePreview>
          { imgPreview.length < 1 && <ImagePreviewImg> <PostFormImg src='https://res.cloudinary.com/ddocnijls/image/upload/v1649796037/postImages/no-image-available-icon-6_necjkv.png' alt="no photos"/></ImagePreviewImg> }
          { imgPreview && imgPreview.map((img, index) => {
            return  <ImagePreviewImg key={ index }>
                      <PostFormImg src={ img.imgFile } alt={ img.imgTitle }/>
                      { img.imgTitle && <h5> { img.imgTitle }</h5> }
                    </ImagePreviewImg>
              })
          }
        </ImagePreview>
    </InfoGroup>
  )
}
