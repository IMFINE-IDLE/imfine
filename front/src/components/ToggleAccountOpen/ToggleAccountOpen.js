import React from 'react';
import {
  BoxToggle,
  TitleSmall,
  Toggle,
  ToggleContainer,
  ToggleLabel,
  ToggleText,
  ToggleWrapper,
} from './style';

/** 상위 컴포넌트에서 세팅할 것
 * const [isOpen, setIsOpen] = useState(true);
 */

function ToggleAccountOpen({ isOpen, setIsOpen }) {
  return (
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
  );
}

export default ToggleAccountOpen;
