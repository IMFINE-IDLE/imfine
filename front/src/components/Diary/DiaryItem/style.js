import styled, { css } from 'styled-components';

const DiaryItemSpan = styled.span`
  ${({ fontSize, padding, color }) => css`
    color: ${color ? 'var(--' + color + '-color)' : 'var(--gray800-color)'};
    font-size: ${fontSize || '1em'};
    font-weight: 700;
    padding: ${padding || '0'};
    white-space: nowrap;
  `}
`;

export { DiaryItemSpan };
