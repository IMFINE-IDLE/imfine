import React from 'react';
import { BoxIcon, BoxImg, ImgIcon, TextImg } from './style';

function IconSymptom({ imgSrc, text }) {
  return (
    <BoxIcon>
      <BoxImg color={'gray'}>
        <ImgIcon />
      </BoxImg>
      <TextImg>{text}</TextImg>
    </BoxIcon>
  );
}

export default IconSymptom;
