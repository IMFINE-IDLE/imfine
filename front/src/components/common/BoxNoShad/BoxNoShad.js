import styled, { css } from 'styled-components';

export const BoxNoShad = styled.div`
  ${({ color, radius, width, height, padding, margin }) =>
    css`
      background-color: ${color
        ? 'var(--' + color + '-color)'
        : 'var(--gray-color)'};
      border-radius: ${radius || '50px'};
      width: ${width || '100%'};
      height: ${height || '100%'};
      padding: ${padding || '1em'};
      margin: ${margin || '0'};
    `}
`;
