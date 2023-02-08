import React, { useState, useEffect } from 'react';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import { Img, RemoveBtn } from './style';
function PreviewImage({ file, onRemove }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
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

export default PreviewImage;
