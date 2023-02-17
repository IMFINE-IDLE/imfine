import styled, { css } from 'styled-components';
import { Btn } from '../../common/Btn/Btn';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';

const DiaryPaperSpan = styled.span`
  ${({ color, size, bold, isDate }) => css`
    color: ${color ? 'var(--' + color + '-color)' : 'var(--icon-color)'};
    font-size: ${size || '1em'};
    font-weight: ${bold ? '700' : '400'};
    text-align: ${isDate ? 'center' : 'start'};
  `}
`;

const DiaryPaperSymptomWrapper = styled(FlexDiv)`
  overflow: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DiaryPaperSymptomDiv = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--icon-color);
  font-size: 0.75em;
  font-weight: 700;
  width: auto;
  border-radius: 20px;
  background-color: var(--light-pink-color);
  padding: 0.3em 0.7em;
  margin-right: 0.7em;
  cursor: default;
`;

const DiaryPaperTitle = styled.button`
  ${Btn}
  padding: 0.4em;
  padding-left: 1.8em;
  width: auto;
`;

export {
  DiaryPaperSpan,
  DiaryPaperSymptomWrapper,
  DiaryPaperSymptomDiv,
  DiaryPaperTitle,
};
