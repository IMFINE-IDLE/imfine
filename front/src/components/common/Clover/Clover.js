import styled, { css } from 'styled-components';

export const Clover = styled.img.attrs((props) => ({
  src: `/assets/clovers/clover${props.code || 'default'}.svg`,
}))`
  ${({ width, height, pointer }) =>
    css`
      width: ${width || '3em'};
      height: ${height || '3em'};
      cursor: ${pointer ? 'pointer' : 'default'};
    `}
`;
