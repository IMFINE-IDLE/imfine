import styled, { css } from 'styled-components';

export const BoxShad = styled.div`
  ${({ color, radius, width, height, padding, margin, shadX, shadY }) =>
    css`
      background-color: ${color
        ? 'var(--' + color + '-color)'
        : 'var(--gray-color)'};
      border-radius: ${radius || '50px'};
      width: ${width || '100%'};
      height: ${height || '100%'};
      padding: ${padding || '1em'};
      margin: ${margin || '0'};
      box-shadow: ${shadX || 2}px ${shadY || 2}px 4px rgba(0, 0, 0, 0.05);
    `}
`;
