import React from 'react';
import { BoxIcon, BoxImg, TextImg } from './style';

function IconSymptom({ id, imgSrc, name, medicalIdList, setMedicalIdList }) {
  return (
    <BoxIcon
      onClick={() => {
        const prevMedicalList = [...medicalIdList];
        let idx = prevMedicalList.findIndex((item) => item.id === id);
        if (idx === -1) {
          prevMedicalList.push({ id, name });
        } else {
          prevMedicalList.splice(idx, 1);
        }
        setMedicalIdList(prevMedicalList);
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
