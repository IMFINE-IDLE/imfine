import styled, { css } from 'styled-components';

export const BoxGrad = styled.div`
  ${({ color, radius, width, height, padding, margin }) =>
    css`
      background: linear-gradient(
        ${color ? 'var(--' + color + '-color)' : 'var(--main-color)'},
        #ffffff 80%
      );
      border-radius: ${radius || '50px'};
      width: ${width || '100%'};
      height: ${height || '100%'};
      padding: ${padding || '1em'};
      margin: ${margin || '0'};
    `}
`;
