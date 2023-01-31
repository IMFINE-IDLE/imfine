import styled, { css } from 'styled-components';

export const Clover = styled.img.attrs((props) => ({
  src: `/assets/clovers/clover${props.code || '1'}.svg`,
}))`
  ${({ width, height }) =>
    css`
      width: ${width || '3em'};
      height: ${height || '3em'};
    `}
`;
