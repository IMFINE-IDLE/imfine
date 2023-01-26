import styled, { css } from 'styled-components';
import { BoxNoShad } from '../common/BoxNoShad/BoxNoShad';

// 하단탭 전체 감싸는 컴포넌트
const TabContainer = styled.div`
  width: 100%;
  height: 4.2em;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--main-color);
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.05);
  display: grid;

  grid-template-columns: 1.2fr 1fr 1.5fr 1fr 1.2fr;
`;

// 메인, 일기장, 대나무, 프로필 탭 wrapper
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 대나무 탭 이미지
const TabImg = styled.img`
  ${({ src, width, height }) => css`
    src: ${src};
    width: ${width || '1em'};
    height: ${height || '1em'};
  `}
`;

// 클로버 탭 wrapper
const TabCenter = styled.div`
  position: relative;
`;

// 클로버 상태창 모달 전체 감싸는 컴포넌트
const CloverStatusContainer = styled(BoxNoShad)`
  position: absolute;
  left: calc(50% - ${(props) => props.width / 2});
  bottom: 5.2em;
`;

// 클로버 li 상위 ul
const CloverWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
  color: var(--gray700-color);
`;

// 클로버 이미지 컴포넌트
const Clover = styled.img`
  ${({ width, height, isMain }) => css`
    width: ${width || '3.125em'};
    height: ${height || '3.125em'};
    position: ${isMain ? 'absolute' : 'static'};
    top: -2em;
  `}

  &.bounce {
    animation: ;
  }
`;

export {
  TabContainer,
  Tab,
  TabCenter,
  TabImg,
  Clover,
  CloverStatusContainer,
  CloverWrap,
};
