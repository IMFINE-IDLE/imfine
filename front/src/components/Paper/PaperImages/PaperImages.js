import React from 'react';
import { BoxImages } from './style';

function PaperImages({ images, setShowFullImage, setClickedImgSrc }) {
  return (
    <BoxImages>
      {images?.map((image) => (
        <img
          src={`	
            https://i8a809.p.ssafy.io/images/${image}`}
          alt=""
          width={'100px'}
          onClick={() => {
            setShowFullImage(true);
            setClickedImgSrc(`	
          https://i8a809.p.ssafy.io/images/${image}`);
          }}
        />
      ))}
    </BoxImages>
  );
}

export default PaperImages;
