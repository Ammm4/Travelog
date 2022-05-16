import React, { useRef } from 'react';
import { useReduxSelector, useReduxDispatch } from '../../../../utils';
import { FormGroup, FormGroupInput, ImagePreview, ImagePreviewImg } from '../GlobalComponents/StyledComponents/Containers';
import { InputsGroupHeading, ImageTitle } from '../GlobalComponents/StyledComponents/Headings';
import { TextArea, InputLabel } from '../GlobalComponents/StyledComponents/Inputs';
import { PostFormImg } from '../GlobalComponents/StyledComponents/Images';
import { BtnImg } from '../GlobalComponents/StyledComponents/Buttons';
import { editPostInfo } from '../../../../redux/globals/globalActions';
import { IoIosImages } from "react-icons/io";
import { MdClear } from "react-icons/md";

let inputStyle = {
  height: '44px',
  padding: '8px'
}
export default function PostImgInput() {
  const { Globals: { postInfo : { imgPreview, images, deletedImageIds }}} = useReduxSelector();
  const dispatch = useReduxDispatch();
  const imageInputRef = useRef();
  const handleKeyUp = (e) => {
    e.target.style.height = '48px';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const imageUploader = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  }
   const handleTitle = (e,i) => {
    const newImages = images.map((image,index) => {
      if(index === i) return { ...image, imgTitle: e.target.value }
      return image
    })
    dispatch(editPostInfo('images', newImages));
    dispatch(editPostInfo('imgPreview', newImages))
  }
  const removeImg = (i) => {
    let newImages = images.filter((img, index) => index !== i);
    let deletedImage = images.find((img,index) => index === i);
    if (deletedImage.hasOwnProperty('public_id')) {
      dispatch(editPostInfo('deletedImageIDs', [...deletedImageIds, deletedImage.public_id]))
    }
     dispatch(editPostInfo('images', newImages));
    dispatch(editPostInfo('imgPreview', newImages))
  }
  const handleFileUpload = (e) => {
   let files = Array.from(e.target.files);
   files.forEach(file => {
     var reader = new FileReader();
     reader.addEventListener("load", function () {
       let newImage = {
         imgFile: reader.result,
         imgTitle: ''
       }
       dispatch(editPostInfo('images', [...images, newImage]));
       dispatch(editPostInfo('imgPreview', [...imgPreview, newImage]))
      }, false);
      reader.readAsDataURL(file);
    })
   }
  return (
    <FormGroup>
      <InputsGroupHeading>Images:</InputsGroupHeading>
     <FormGroupInput>
       <BtnImg htmlFor="images" onClick={ imageUploader }><IoIosImages style={{fontSize: '2rem'}} /> 
        { imgPreview.length > 0 ? 'Add More Images' : 'Upload Images' }
       </BtnImg>
        <input 
          id="images" 
          name="images" 
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          ref={imageInputRef}
          onChange={(e) => handleFileUpload(e)}
        />
     </FormGroupInput>
       { imgPreview.length > 0 && 
             <> 
              <InputLabel>Images({ imgPreview.length })</InputLabel>
              <ImagePreview>
                { imgPreview.map((img, index) => {
                  return  <ImagePreviewImg key={ img.name || index }>  
                            <PostFormImg src={ img.imgFile } alt={img.imgTitle}/>
                            <span className="remove-img" onClick={ () => removeImg(index) }><MdClear/></span>
                            { img.imgTitle  && <ImageTitle>{img.imgTitle}</ImageTitle> }
                            <InputLabel>Add an Image Title</InputLabel>
                            <TextArea
                                 style={inputStyle}
                                 type="text"
                                 value={img.imgTitle}
                                 maxLength="50" 
                                 placeholder="Title/Name..."
                                 onChange={(e) => handleTitle(e,index)}
                                 onKeyUp={(e) => handleKeyUp(e) }
                             />
                          </ImagePreviewImg>
                })
                }
              </ImagePreview>
            </>
          }
    </FormGroup>  
  )
}
