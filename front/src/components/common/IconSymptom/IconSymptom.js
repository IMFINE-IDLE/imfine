import React from 'react';
import { BoxIcon, BoxImg, TextImg } from './style';

function IconSymptom({ type, id, name, image, handleMenuClick }) {
  // const handleMenuClick = () => {
  //   console.log('clicked');
  // };

  return (
    <BoxIcon onClick={handleMenuClick}>
      <BoxImg color={'gray'}>
        <img src={image} style={{ width: '100%', height: '100%' }} alt={name} />
      </BoxImg>
      <TextImg>{name}</TextImg>
    </BoxIcon>
  );
}

export default IconSymptom;
