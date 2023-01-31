import styled from 'styled-components';
import { BoxRT25 } from '../common/BoxRT25/BoxRT25';
import { Btn } from '../common/Btn/Btn';

const BoxTopArea = styled.div`
  padding: 2em;
`;

const Title = styled.div`
  margin: 1.5em 0;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
`;

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

const ToggleWrapper = styled.div`
  position: relative;
  display: inline-block;
  /* ::before {
    content(${(prop) => (prop.isOpen ? '공개' : '비공개')})
  } */
`;
const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
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

const BoxSymptom = styled.div`
  line-heigt: 25px;
`;

const BtnSymptom = styled.span`
  ${Btn}
  display: inline-block;
  font-size: 12px;
  color: var(--icon-color);
  padding: 0.5em;
  cursor: pointer;
  width: auto;
  margin: 0 0.3em;
`;

const BtnLeftTap = styled(BoxRT25)`
  width: 50%;
  text-align: center;
`;

const BoxPickMenu = styled.div`
  padding: 0 1em 1em;
  background-color: var(--gray-color);
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  /* align-items: center; */
`;

export {
  Title,
  BoxTopArea,
  BoxToggle,
  ToggleWrapper,
  ToggleLabel,
  Toggle,
  BoxSymptom,
  BtnSymptom,
  BoxPickMenu,
  BtnLeftTap,
  TitleSmall,
};
