import React, { useState, useEffect } from 'react';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { Img, RemoveBtn } from './style';
function ModifyPreviewImage({ file, onRemove }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    console.log(typeof file.image);
    const reader = new FileReader();
    if (typeof file.image === 'string') {
      setPreviewUrl(`	
      https://i8a809.p.ssafy.io/images/${file.image}`);
    } else {
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      {previewUrl ? (
        <FlexDiv>
          <Img onClick={onRemove} src={previewUrl} alt="Preview" />
        </FlexDiv>
      ) : (
        <p>No Preview Available</p>
      )}
    </>
  );
}

export default ModifyPreviewImage;
