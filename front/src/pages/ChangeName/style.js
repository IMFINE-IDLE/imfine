import styled from 'styled-components';
import { Btn } from '../../components/common/Btn/Btn';

const TitleText = styled.h2`
  color: var(--icon-color);
  font-size: 1.25em;
  font-weight: 700;
  padding: 1.5em 0;
`;

const NicknameInput = styled.input`
  border: 0;
  background-color: var(--gray-color);
  border-radius: 20px;
  outline: none;
  padding: 1em;
  width: 100%;
  height: 4.05em;
`;

const SubmitBtn = styled.button`
  ${Btn}
`;

export { TitleText, NicknameInput, SubmitBtn };
