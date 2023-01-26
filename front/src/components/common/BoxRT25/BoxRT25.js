import styled, { css } from 'styled-components';

export const BoxRT25 = styled.div`
  ${({ color, width, height }) => css`
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--main-color)'};
    border-radius: 0px 25px 0px 0px;
    width: ${width || '100%'};
    height: ${height || '100%'};
  `}
`;
