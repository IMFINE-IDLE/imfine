import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const BtnEmailCheckButton = styled.button`
  ${Btn}
  right: 0;
  bottom: 0;
  margin-top: 1em;
  cursor: pointer;
  background-color: var(--main-color);
  width: 5.2em;
  height: 3em;
  text-align: center;
  padding: 0;
`;

export { BtnEmailCheckButton };
