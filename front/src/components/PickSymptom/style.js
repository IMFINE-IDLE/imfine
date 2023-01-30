import styled from 'styled-components';
import { BoxRT25 } from '../common/BoxRT25/BoxRT25';

const BoxTopArea = styled.div`
  padding: 2em;
`;

const Title = styled.div`
  margin: 1.5em 0;
  text-align: center;
  font-weight: ${(props) => (props.small ? 500 : 600)};
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

const BoxPickMenu = styled.div`
  padding: 1em 1.5em;
  background-color: aliceblue;
`;

const BtnLeftTap = styled(BoxRT25)`
  width: 50%;
  text-align: center;
`;

export {
  Title,
  BoxTopArea,
  BoxToggle,
  ToggleWrapper,
  ToggleLabel,
  Toggle,
  BoxPickMenu,
  BtnLeftTap,
};
