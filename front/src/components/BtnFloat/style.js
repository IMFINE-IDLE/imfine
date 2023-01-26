import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../common/Btn/Btn';

const BoxBtnFloat = styled.div`
  position: fixed;
  width: 60%;
  min-width: 200px;
  max-width: 320px;
  bottom: 90px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const CircleFloat = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: var(--main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BtnLink = styled(Link)`
  ${Btn}
`;

export { BoxBtnFloat, CircleFloat, BtnLink };
