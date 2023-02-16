import React from 'react';
import { FlexDiv } from '../FlexDiv/FlexDiv';
import { BoxImg, TextImg } from './style';

function IconSymptom({ type, id, name, image, handleMenuClick }) {
  return (
    <FlexDiv
      onClick={handleMenuClick}
      height="auto"
      direction="column"
      justify="start"
    >
      <BoxImg color={'gray'}>
        <img src={image} style={{ width: '100%', height: '100%' }} alt={name} />
      </BoxImg>
      <TextImg>{name}</TextImg>
    </FlexDiv>
  );
}

export default IconSymptom;
