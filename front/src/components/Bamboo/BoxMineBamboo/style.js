import styled from 'styled-components';
import { SpeechBubble } from '../../Modal/style';
import { BoxGrad } from '../../common/BoxGrad/BoxGrad';

const Blank = styled.div`
  padding: 2.5em;
  width: 100%;
`;

const BoxInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextBubble = styled(SpeechBubble)`
  margin: 0;
  width: 100%;
  font-size: 14px;
  flex-direction: column;
  border-radius: 50px;
  line-height: 1rem;
  color: var(--icon-color);
  font-weight: 700;
  padding: 1em 2em;
`;

const BigCircle = styled(BoxGrad)`
  position: fixed;
  width: 200%;
  height: 600px;
  top: 15%;
  left: -50%;
  border-radius: 60%;
  z-index: -1;
`;

export { Blank, BoxInner, TextBubble, BigCircle };
