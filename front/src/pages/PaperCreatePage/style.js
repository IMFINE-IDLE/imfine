import styled from 'styled-components';
import { BoxNoShad } from '../../components/common/BoxNoShad/BoxNoShad';
import { Btn } from '../../components/common/Btn/Btn';
import { SpeechBubble } from '../../components/Modal/style';
const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 100px;
  border-radius: 0px 0px 50px 50px;
  padding: 1em 1em 1em 1em;
  background-color: var(--main-color);
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 1em;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentLabel = styled.label`
  font-weight: ${(props) => props.weight || '700'};
  color: var(--icon-color);
  margin: ${(props) => props.margin || '1.5em 0 1.5em 2em'};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: #aaa;
  }
`;

const BtnUpdate = styled.button`
  ${Btn}
  width: 20em;
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
  display: inline-block;
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

export {
  BoxPaperDetail,
  BoxContent,
  TopDiv,
  ContentLabel,
  RightDiv,
  InputContainer,
  StyledInput,
  BtnUpdate,
  TextBubble,
};
