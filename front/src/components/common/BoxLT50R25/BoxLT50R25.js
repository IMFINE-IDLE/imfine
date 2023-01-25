import styled, { css } from 'styled-components';

export const BoxLT50R25 = styled.div`
  ${({ color, width, height, padding, margin }) => css`
    background-color: ${color || 'var(--gray-color)'};
    border-radius: 50px 25px 25px 25px;
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '1.5em'};
    margin: ${margin || '1.5em'};
  `}
`;
