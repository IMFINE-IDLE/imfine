import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Btn } from '../../common/Btn/Btn';

const BoxBtnFloat = styled.div`
  position: relative;
  width: 60%;
  min-width: 9em;
  max-width: 12em;
  bottom: 90px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column-reverse;
`;

const IconContainer = styled.div`
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BtnLink = styled(Link)`
  ${Btn}
`;
export { BoxBtnFloat, IconContainer, BtnLink };
