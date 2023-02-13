import styled from 'styled-components';

const TitleSmall = styled.span`
  font-weight: 600;
  color: var(--gray800-color);
  display: inline;
`;

const BoxToggle = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  line-height: 25px;
  margin-bottom: 1em;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleText = styled.span`
  font-size: 0.75em;
  margin-right: 0.5em;
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: inline-block;
  /* ::before {
    content(${(prop) => (prop.isOpen ? '공개' : '비공개')})
  } */
`;
const ToggleLabel = styled.label`
  position: absolute;
  top: 3px;
  left: 0;
  width: 42px;
  height: 24px;
  border-radius: 15px;
  background: var(--gray700-color);
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const Toggle = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  &:checked + ${ToggleLabel} {
    background: var(--main-color);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export {
  BoxToggle,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  ToggleLabel,
  Toggle,
  TitleSmall,
};
