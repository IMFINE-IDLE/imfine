import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import {
  Title,
  BoxTopArea,
  BoxPickMenu,
  BtnLeftTap,
  BoxToggle,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
  TitleSmall,
  BoxSymptom,
} from './style';

function PickSymptom() {
  const [isOpen, setIsOpen] = useState(true);
  const [medicalIdList, setMedicalIdList] = useState([]);
  const medicalList = useSelector((state) => {
    return state.medical.medicalList;
  });

  return (
    <div>
      <Title>계정 기본 설정</Title>
      <BoxTopArea>
        <BoxToggle>
          <TitleSmall style={{ fontWeight: '600' }}>계정 공개 여부</TitleSmall>
          <div style={{ display: 'inline-block' }}>
            {/* <span>{isOpen ? '공개' : '비공개'}</span> */}
            <ToggleWrapper isOpen={isOpen}>
              <Toggle
                id="toggle"
                type="checkbox"
                onChange={() => {
                  setIsOpen((prev) => !prev);
                  // console.log(isOpen);
                }}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </div>
        </BoxToggle>
        <div>
          <TitleSmall>관심 질병/수술 &nbsp; |</TitleSmall>
          {medicalIdList.map((medical) => (
            <BoxSymptom key={medical.id}>{medical.name}</BoxSymptom>
          ))}
        </div>
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
              medicalIdList={medicalIdList}
              setMedicalIdList={setMedicalIdList}
            />
          ))}
        </BoxPickMenu>
      </div>
    </div>
  );
}

export default PickSymptom;
