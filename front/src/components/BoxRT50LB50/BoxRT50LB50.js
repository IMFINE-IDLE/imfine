import styled, { css } from 'styled-components';

export const BoxRT50LB50 = styled.div`
  ${({ color, width, height, padding, margin }) => css`
    background-color: ${color || 'var(--light-color)'};
    border-radius: 0px 50px 0px 50px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '1.5em'};
    margin: ${margin || '1.5em'};
  `}
`;
