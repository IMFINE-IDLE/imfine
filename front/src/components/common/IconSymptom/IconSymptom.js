import React from 'react';
import { TiInputChecked } from 'react-icons/ti';
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
        <BoxImg color={'gray'}>
          <img
            src={image}
            style={{ width: '100%', height: '100%' }}
            alt={name}
          />
        </BoxImg>
        {clicked && (
          <TiInputChecked
            style={{
              position: 'absolute',
              width: '1.8em',
              height: '1.8em',
              fill: '#A9D7D0',
            }}
          />
        )}
      </FlexDiv>
      <TextImg>{name}</TextImg>
    </FlexDiv>
  );
}

export default IconSymptom;
