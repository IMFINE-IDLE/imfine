import styled, { css } from 'styled-components';
import { BoxGrad } from '../../../components/common/BoxGrad/BoxGrad';
import { TitleSmall, BtnSymptom } from '../../../components/PickSymptom/style';

const DiaryBoxGrad = styled(BoxGrad)`
  height: calc(100vh - var(--nav-height));
`;

const DiaryCreateTitleText = styled.h2`
  color: var(--icon-color);
  font-size: 1em;
  font-weight: 700;
`;

const DiaryCreateInput = styled.input`
  border: 0;
  background-color: var(--gray-color);
  border-radius: 20px;
  outline: none;
  padding: 1em;
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

const DiaryCreateTitleSmall = styled(TitleSmall)`
  font-weight: 600;
  color: var(--gray800-color);
  display: inline;
`;

const DiaryCreateBtnSymptom = styled(BtnSymptom)`
  ${({ color }) => css`
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--main-color)'};
  `}
`;

export {
  DiaryBoxGrad,
  DiaryCreateTitleText,
  DiaryCreateInput,
  DiaryCreateTextarea,
  DiaryCreateTitleSmall,
  DiaryCreateBtnSymptom,
};
