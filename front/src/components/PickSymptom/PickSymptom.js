import React, { useState } from 'react';
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
} from './style';

function PickSymptom({ inputEvent }) {
  const [isOpen, setIsOpen] = useState(true);
  const symptoms = [
    {
      id: 1,
      name: '가정의학과 & 내과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
    {
      id: 2,
      name: '가정의학과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
    {
      id: 3,
      name: '내과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
    {
      id: 4,
      name: '가정의학과 & 내과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
    {
      id: 5,
      name: '가정의학과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
    {
      id: 6,
      name: '내과',
      imgSrc: '/assets/icons/가정의학과.png',
    },
  ];

  return (
    <div>
      <Title>계정 기본 설정</Title>
      <BoxTopArea>
        <BoxToggle>
          <h3>계정 공개 여부</h3>
          <div style={{ display: 'inline-block' }}>
            {/* <span>{isOpen ? '공개' : '비공개'}</span> */}
            <ToggleWrapper isOpen={isOpen}>
              <Toggle
                id="toggle"
                type="checkbox"
                defaultChecked
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  // console.log(isOpen);
                }}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </div>
        </BoxToggle>
        <h3>관심 질병/수술 &nbsp; |</h3>
      </BoxTopArea>
      <div>
        <BtnLeftTap>질병/수술 선택</BtnLeftTap>
        <BoxPickMenu>
          {symptoms.map((symptom) => (
            <IconSymptom
              key={symptom.id}
              name={symptom.name}
              imgSrc={symptom.imgSrc}
            />
          ))}
        </BoxPickMenu>
      </div>
    </div>
  );
}

export default PickSymptom;
