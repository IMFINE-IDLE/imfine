import styled, { css } from 'styled-components';
import { BoxShad } from '../../../components/common/BoxShad/BoxShad';

const DiaryInfoContainer = styled(BoxShad)`
  display: flex;
  flex-direction: column;
  height: auto;
  padding-top: 0;
`;

const DiaryDateSpan = styled.span`
  ${({ width, bold, textAlign, padding, pointer }) => css`
    width: ${width};
    text-align: ${textAlign || 'center'};
    font-weight: ${bold ? '700' : '400'};
    color: var(--icon-color);
    padding: ${padding || '1em 0'};
    cursor: ${pointer ? 'pointer' : 'default'};
  `}
`;

export { DiaryInfoContainer, DiaryDateSpan };
