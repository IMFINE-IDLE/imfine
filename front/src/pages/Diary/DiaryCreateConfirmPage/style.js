import styled, { css } from 'styled-components';
import { BoxGrad } from '../../../components/common/BoxGrad/BoxGrad';
import { Btn } from '../../../components/common/Btn/Btn';

const DiaryBoxGrad = styled(BoxGrad)`
  height: calc(100vh - var(--nav-height));
`;

const DiaryCreateTitleText = styled.h2`
  color: var(--icon-color);
  font-size: 1em;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const DiaryCreateInput = styled.input`
  border: 0;
  background-color: var(--gray-color);
  border-radius: 20px;
  outline: none;
  padding: 1em;
  margin-bottom: 1.5em;
  width: 100%;
  height: 4.05em;
`;

const DiaryCreateTextarea = styled.textarea`
  border: 0;
  background-color: var(--gray-color);
  border-radius: 20px;
  outline: none;
  overflow: hidden;
  resize: none;
  display: inline-block;
  width: 100%;
  padding: 1em;
  height: 7em;
`;
const SubmitBtn = styled.button`
  ${Btn}
`;

export {
  DiaryBoxGrad,
  DiaryCreateTitleText,
  DiaryCreateInput,
  DiaryCreateTextarea,
  SubmitBtn,
};
