import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';

const BoxLogin = styled(BoxGrad)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxInnerLogin = styled.div`
  width: 100%;
  max-width: 280px;
  margin: 2em 0;
`;

export { BoxLogin, BoxInnerLogin };
