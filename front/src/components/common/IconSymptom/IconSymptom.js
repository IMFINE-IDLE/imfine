import React from 'react';
import { FlexDiv } from '../FlexDiv/FlexDiv';
import { BoxImg, TextImg } from './style';

function IconSymptom({ type, id, name, image, handleMenuClick, clicked }) {
  return (
    <FlexDiv
      onClick={handleMenuClick}
      height="auto"
      direction="column"
      justify="start"
    >
      <FlexDiv width="auto" height="auto" style={{ position: 'relative' }}>
        <BoxImg color={'gray'} clicked={clicked}>
          <img
            src={image}
            style={{ width: '100%', height: '100%' }}
            alt={name}
          />
        </BoxImg>
      </FlexDiv>
      <TextImg>{name}</TextImg>
    </FlexDiv>
  );
}

export default IconSymptom;
