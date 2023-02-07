import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { SpeechBubble } from '../../components/Modal/style';

const BoxPaperFeed = styled.div`
  position: relative;
  padding: 0 1em 1em;
  overflow: hidden;
`;

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

const BigCircle = styled(BoxGrad)`
  position: fixed;
  width: 200%;
  height: 600px;
  top: 15%;
  left: -50%;
  border-radius: 60%;
  z-index: -1;
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

const Circle = styled(BoxGrad)`
  position: fixed;
  top: ${(prop) => (prop.small ? '70px' : null)};
  right: ${(prop) => (prop.small ? '-150px' : null)};
  left: ${(prop) => (prop.small ? null : '-230px')};
  bottom: ${(prop) => (prop.small ? null : '0px')};
  width: ${(prop) => (prop.small ? '300px' : '500px')};
  height: ${(prop) => (prop.small ? '300px' : '500px')};
  border-radius: 50%;
  z-index: -1;
`;

export {
  BoxNoPaperFeed,
  BigCircle,
  BoxInner,
  TextBubble,
  BoxPaperFeed,
  Circle,
};
