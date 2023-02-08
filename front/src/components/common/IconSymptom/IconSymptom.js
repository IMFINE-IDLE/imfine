import React from 'react';
import { BoxIcon, BoxImg, TextImg } from './style';

function IconSymptom({ type, id, name, imgSrc, ToggleSymptom }) {
  return (
    <BoxIcon
      onClick={() => {
        ToggleSymptom(type, id, name);
      }}
    >
      <BoxImg color={'gray'}>
        <img
          src={imgSrc}
          style={{ width: '100%', height: '100%' }}
          alt={name}
        />
      </BoxImg>
      <TextImg>{name}</TextImg>
    </BoxIcon>
  );
}

export default IconSymptom;
