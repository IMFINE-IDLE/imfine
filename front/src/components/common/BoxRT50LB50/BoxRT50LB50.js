import styled, { css } from 'styled-components';

export const BoxRT50LB50 = styled.div`
  ${({ color, width, height, padding, margin, shad }) => css`
    background-color: ${color
      ? 'var(--' + color + '-color)'
      : 'var(--light-color)'};
    border-radius: 0px 50px 0px 50px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '1em'};
    margin: ${margin || '0'};
    box-shadow: ${shad ? '2px 2px 4px rgba(0, 0, 0, 0.05)' : ''};
  `}
`;
