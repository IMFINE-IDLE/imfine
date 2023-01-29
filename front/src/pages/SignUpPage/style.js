import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { Btn } from '../../components/common/Btn/Btn';
import { InputGray } from '../../components/common/InputGray/InputGray';

const BoxSignUp = styled.div`
  padding: 2em;
`;

const TitleSignUp = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1.5em;
`;

const CloverImg = styled.img.attrs({
  src: '/assets/images/clover.png',
})`
  width: 100px;
  margin: 0 0 2em -0.5em;
`;

const BoxInnerSignup = styled(BoxGrad)`
  padding: 1em 4em 0;
  margin: 0;
`;

const Label = styled.label`
  font-weight: 700;
  display: inline-block;
  margin-top: 1.5em;
`;

const InfoSpan = styled.span`
  font-size: 12px;
  color: var(--icon-color);
`;

const InputSignUp = styled(InputGray)`
  height: 3em;
  padding: 1em;
  margin-top: 1em;
`;

const BtnSignup = styled.button`
  ${Btn}
  margin-top: 2em;
`;

const ErrorMsg = styled.p`
  font-size: 12px;
  color: var(--red-color);
  margin: 0.5em 0 0;
`;

export {
  BoxSignUp,
  TitleSignUp,
  CloverImg,
  BoxInnerSignup,
  Label,
  InfoSpan,
  InputSignUp,
  BtnSignup,
  ErrorMsg,
};
