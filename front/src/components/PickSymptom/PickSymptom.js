import React from 'react';
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
  return (
    <div>
      <Title>계정 기본 설정</Title>
      <BoxTopArea>
        <BoxToggle>
          <h3>계정 비공개 설정하기</h3>
          <ToggleWrapper>
            <Toggle id="toggle" type="checkbox" />
            <ToggleLabel htmlFor="toggle" />
          </ToggleWrapper>
        </BoxToggle>
        <h3>관심 질병/수술 |</h3>
      </BoxTopArea>
      <BoxPickMenu>
        <BtnLeftTap>질병/수술 선택</BtnLeftTap>
      </BoxPickMenu>
    </div>
  );
}

export default PickSymptom;
