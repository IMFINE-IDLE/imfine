import styled, { css } from 'styled-components';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';

const DiaryInfoContainer = styled(BoxShad)`
  display: flex;
  flex-direction: column;
  height: auto;
  padding-top: 0;
`;

const DiaryInfoWrapper = styled.div``;

const DiaryDateSpan = styled.span`
  ${({ width, bold }) => css`
    width: ${width};
    text-align: center;
    font-weight: ${bold ? '700' : '400'};
    color: var(--icon-color);
    padding-top: 1em;
  `}
`;

export { DiaryInfoContainer, DiaryInfoWrapper, DiaryDateSpan };
