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

const Label = styled.label`
  padding-bottom: 1em;
  font-weight: 700;
  color: var(--icon-color);
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

const BoxOptions = styled.div`
  text-align: center;
  font-size: 12px;
  padding-top: 1.2em;
  color: var(--icon-color);
`;

const SpanOption = styled.span`
  cursor: pointer;
  margin: 0 1em;
`;

export {
  BoxLogin,
  BoxLogo,
  BoxInnerLogin,
  BoxInput,
  BtnLogin,
  BoxOptions,
  SpanOption,
  Label,
};
