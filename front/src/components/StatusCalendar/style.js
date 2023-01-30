import styled, { css } from 'styled-components';

// 클로버 이미지 컴포넌트
const Clover = styled.img`
  ${({ width, height, cloverCode }) => css`
    width: ${width || '2.25em'};
    height: ${height || '2.25em'};
    top: -2em;
    left: calc(50% - 1.5625em);
    cursor: pointer;
  `}
`;

export { Clover };
