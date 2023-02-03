import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import {
  Title,
  BoxTopArea,
  BoxPickMenu,
  BtnLeftTap,
  BoxToggle,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
  TitleSmall,
  BoxSymptom,
  BtnSymptom,
} from './style';

function PickSymptom() {
  const [isOpen, setIsOpen] = useState(true);
  const [medicalIdList, setMedicalIdList] = useState([]);
  const medicalList = useSelector((state) => {
    return state.medical.medicalList;
  });

  const ToggleSymptom = (itemId, itemName) => {
    const prevMedicalList = [...medicalIdList];
    let idx = prevMedicalList.findIndex((item) => item.id === itemId);
    if (idx === -1) {
      prevMedicalList.push({ id: itemId, name: itemName });
    } else {
      prevMedicalList.splice(idx, 1);
    }
    setMedicalIdList(prevMedicalList);
  };

  return (
    <div>
      <Title>계정 기본 설정</Title>
      <BoxTopArea>
        <BoxToggle>
          <TitleSmall style={{ fontWeight: '600' }}>계정 공개 여부</TitleSmall>
          <ToggleContainer>
            <ToggleText>{isOpen ? '공개' : '비공개'}</ToggleText>
            <ToggleWrapper isOpen={isOpen}>
              <Toggle
                id="toggle"
                type="checkbox"
                onChange={() => {
                  setIsOpen((prev) => !prev);
                }}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </ToggleContainer>
        </BoxToggle>
        <BoxSymptom>
          <TitleSmall>관심 질병/수술 &nbsp; | &nbsp;</TitleSmall>
          {medicalIdList.map((medical) => (
            <BtnSymptom
              onClick={() => ToggleSymptom(medical.id, medical.name)}
              key={medical.id}
            >
              {medical.name}
            </BtnSymptom>
          ))}
        </BoxSymptom>
      </BoxTopArea>
      <div>
        <BtnLeftTap>질병/수술 선택</BtnLeftTap>
        <BoxPickMenu>
          {medicalList.map((medical) => (
            <IconSymptom
              key={medical.id}
              id={medical.id}
              name={medical.name}
              imgSrc={medical.imgSrc}
              ToggleSymptom={ToggleSymptom}
            />
          ))}
        </BoxPickMenu>
      </div>
    </div>
  );
}

export default PickSymptom;
