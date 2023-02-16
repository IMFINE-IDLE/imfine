import styled from 'styled-components';
import { SpeechBubble } from '../../components/Modal/style';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';

const BoxNoPaperFeed = styled.div`
  position: relative;
  padding: 0 1em 1em;
  overflow: hidden;
  display: flex;
  height: 60vh;
  justify-content: end;
  align-items: center;
  flex-direction: column;
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
  line-height: 1.5rem;
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

export { BoxNoPaperFeed, BoxInner, TextBubble, BigCircle };
