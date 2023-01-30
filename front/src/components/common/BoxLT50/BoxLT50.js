import styled, { css } from 'styled-components';

export const BoxRT25 = styled.div`
  ${({ color, width, height, padding, margin, shad }) => css`
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--main-color)'};
    border-radius: 50px 0px 0px 0px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '1em'};
    margin: ${margin || '0'};
    box-shadow: ${shad ? '2px 2px 4px rgba(0, 0, 0, 0.05)' : ''};
  `}
`;
