import React from 'react';
import { BoxIcon, BoxImg, TextImg } from './style';

function IconSymptom({ imgSrc, name }) {
  return (
    <BoxIcon>
      <BoxImg color={'gray'}>
        <img src={imgSrc} style={{ width: '100%', height: '100%' }} />
      </BoxImg>
      <TextImg>{name}</TextImg>
    </BoxIcon>
  );
}

export default IconSymptom;
