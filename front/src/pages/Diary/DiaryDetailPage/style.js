import styled, { css } from 'styled-components';
import { BoxShad } from '../../../components/common/BoxShad/BoxShad';
import { Btn } from '../../../components/common/Btn/Btn';

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

const DiaryReportBtn = styled.button`
  ${Btn}
  ${({ top }) => css`
    position: absolute;
    top: ${top || '45px'};
    right: 0;
    width: 6rem;
    padding: 0em;
    height: 2.5rem;
    background-color: var(--light-color);
    color: var(--icon-color);
    z-index: 2;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  `}
`;

export { DiaryInfoContainer, DiaryDateSpan, DiaryReportBtn };
