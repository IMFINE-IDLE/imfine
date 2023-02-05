import styled, { css } from 'styled-components';

export const FlexDiv = styled.div`
  ${({ width, height, justify, align, direction, wrap, display }) => css`
    display: ${display || 'flex'};
    flex-direction: ${direction || 'row'};
    justify-content: ${justify || 'center'};
    align-items: ${align || 'center'};
    flex-wrap: ${wrap || 'nowrap'};
    width: ${width || '100%'};
    height: ${height || '100%'};
  `}
`;
