import React from 'react';
import { BoxImages } from './style';

function PaperImages({ images }) {
  return (
    <BoxImages>
      {images?.map((image) => (
        <img
          src={`	
        https://i8a809.p.ssafy.io/images/${image}`}
          alt=""
          width={'100px'}
        />
      ))}
    </BoxImages>
  );
}

export default PaperImages;
