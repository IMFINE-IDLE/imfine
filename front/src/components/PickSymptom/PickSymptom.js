import React, { useRef, useState } from 'react';
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

function PickSymptom() {
  const [isOpen, setIsOpen] = useState(true);
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
        <BoxPickMenu></BoxPickMenu>
      </div>
    </div>
  );
}

export default PickSymptom;
