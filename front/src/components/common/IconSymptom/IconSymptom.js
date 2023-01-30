import React from 'react';
import { BoxIcon, BoxImg, TextImg } from './style';

function IconSymptom({ id, imgSrc, name, setMedicalIdList }) {
  return (
    <BoxIcon
      onClick={() => {
        console.log(name);
        setMedicalIdList((prev) => [...new Set([...prev, id])]);
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
