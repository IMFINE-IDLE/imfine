import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { Btn } from '../../components/common/Btn/Btn';

const BoxOnboarding = styled(BoxGrad)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 3em;
`;

const BtnNext = styled.button`
  ${Btn}
  border-radius: 25px;
  width: calc(100vw - 5em);
  height: 3.5em;
`;

export { BoxOnboarding, BtnNext };
