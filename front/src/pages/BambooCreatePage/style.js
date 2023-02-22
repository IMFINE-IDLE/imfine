import styled from 'styled-components';
import { Btn } from '../../components/common/Btn/Btn';
const DivTextArea = styled.div`
  text-align: center;
`;

const BtnUpdate = styled.button`
  ${Btn}
  width: 20em;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
  display: inline-block;
`;

export { DivTextArea, BtnUpdate };
