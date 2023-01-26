import styled, { css } from 'styled-components';

// export const BoxGrad = styled.div`
//   background: linear-gradient(${(props) => props.color || '#A9D7D0'}, #ffffff);
//   border-radius: ${(props) => props.radius || '50px'};
//   width: ${(props) => props.width || '100%'};
//   height: ${(props) => props.height || '100%'};
//   padding: ${(props) => props.height || '100%'};
//   margin: ${(props) => props.height || '100%'};
// `;

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
      padding: ${padding || '1.5em'};
      margin: ${margin || '1.5em'};
    `}
`;
