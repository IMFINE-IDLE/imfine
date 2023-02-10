import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Clover } from '../common/Clover/Clover';

// 하단탭 전체 감싸는 컴포넌트
const TabContainer = styled.div`
  width: 100%;
  height: 4.2em;
  background-color: #ffffff;
  position: fixed;
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
  position: relative;
`;

const TabNavLink = styled(NavLink)`
  & div {
    display: none;
  }

  &.active {
    color: var(--dark-color);
  }
  &.active div {
    display: block;
  }
`;

// 메인, 일기장, 대나무, 프로필 탭 상단 액티브 표시
const ActiveBar = styled.div`
  width: 2.125em;
  height: 0.3em;
  background-color: var(--dark-color);
  position: absolute;
  top: 0;
  left: calc(50% - 1.0625em);
  border-radius: 0 0 0.2em 0.2em;
`;

// 클로버 탭 wrapper
const TabCenter = styled.div`
  position: relative;
  display: flex;
  justify
`;

const MainClover = styled(Clover)`
  ${({ width }) => css`
    position: absolute;
    top: -2em;
    left: calc(50% - ${width} / 2);
  `}
`;

export { TabContainer, Tab, TabNavLink, ActiveBar, TabCenter, MainClover };
