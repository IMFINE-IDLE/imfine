import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { Btn } from '../../components/common/Btn/Btn';

const BoxLogin = styled(BoxGrad)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxLogo = styled.div`
  height: 50vh;
  max-width: 280px;
  /* margin: 2em 0; */
`;

const BoxInnerLogin = styled.div`
  width: 100%;
  max-width: 280px;
  margin: 2em 0;
`;

const BoxInput = styled.div`
  margin: 1.2em 0;
`;

const BtnLogin = styled.button`
  ${Btn}
`;

export { BoxLogin, BoxLogo, BoxInnerLogin, BoxInput, BtnLogin };
