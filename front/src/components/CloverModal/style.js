import styled, { css } from 'styled-components';
import { BoxShad } from '../common/BoxShad/BoxShad';

// 클로버 상태창 모달 전체 감싸는 컴포넌트
const CloverStatusContainer = styled(BoxShad)`
  ${({ width, isCenter }) => css`
    position: ${isCenter ? 'absolute' : 'fixed'};
    left: calc(50% - ${width} / 2);
    bottom: ${isCenter ? 'calc(50% - 5.5em)' : '5.2em'};
  `}
`;

// 클로버 li 상위 ul
const CloverWrap = styled.ul`
  ${({ position, zIndex, top }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    text-align: center;
    color: var(--gray700-color);
    position: ${position || 'static'};
    z-index: ${zIndex || '0'};
    top: ${top || '0'};
  `}
`;

export { CloverStatusContainer, CloverWrap };
