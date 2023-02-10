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
    gap,
    padding,
    margin,
  }) => css`
    display: ${display || 'flex'};
    flex-direction: ${direction || 'row'};
    justify-content: ${justify || 'center'};
    align-items: ${align || 'center'};
    flex-wrap: ${wrap || 'nowrap'};
    gap: ${gap || '0'};
    width: ${width || '100%'};
    height: ${height || '100%'};
    padding: ${padding || '0'};
    margin: ${margin || '0'};
  `}
`;
