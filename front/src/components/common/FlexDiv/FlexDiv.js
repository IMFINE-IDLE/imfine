import styled, { css } from 'styled-components';

export const FlexDiv = styled.div`
  ${({
    display,
    width,
    height,
    justify,
    align,
    direction,
    wrap,
    padding,
    margin,
  }) => css`
    display: ${display || 'flex'};
    flex-direction: ${direction || 'row'};
    justify-content: ${justify || 'center'};
    align-items: ${align || 'center'};
    flex-wrap: ${wrap || 'nowrap'};
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '0'};
    margin: ${margin || '0'};
  `}
`;
