import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBar, NavItem, Logo, Title, Search, Bell } from './style';
import { useNavigate, NavLink } from 'react-router-dom';
import { BiChevronLeft, BiSearch, BiBell } from 'react-icons/bi';
import NavBarRightItem from './NavBarRightItem';
import { EventSourcePolyfill } from 'event-source-polyfill';
function NavBarBasic({
  BackgroundColor,
  TextColor,
  Back,
  Text,
  NoRightItem,
  BackFromPaperDetail,
}) {
  const userId = useSelector((state) => {
    return state.user.uid;
  });

  const isNew = useSelector((state) => {
    return state.event.value.isNew;
  });

  console.log('event changed', isNew);
  // 작성예시 :
  // <NavBarBasic Back={true} Text={'일기장 작성하기'} BackgroundColor={'icon'} TextColor={'gray'} />

  // ** [0209] ** 기존 props의 path값은 삭제되었습니다.

  // Back: boolean parameter
  // Back == false면 로고있는 네비게이션 바
  // Back == true면 뒤로가기버튼있는 네비게이션 바
  // Text = 네비게이션 바 타이틀 값
  // BackgroundColor : 네비게이션 바 배경색상 (default: var(--gray-color))
  // TextColor : 타이틀이 있는 네비게이션의 경우, props로 컬러변경 (default: var(--icon-color))

  const navigate = useNavigate();
  if (!Back) {
    return (
      <NavBar color={BackgroundColor}>
        <NavItem justify="left">
          <NavLink to="/">
            <Logo src="/assets/images/logo.svg" alt="logo-img" />
          </NavLink>
        </NavItem>
        <NavItem justify="center">
          <Title display="none">{Text}</Title>
        </NavItem>
        {!NoRightItem && <NavBarRightItem isNew={isNew} />}
      </NavBar>
    );
  } else {
    return (
      <NavBar color={BackgroundColor}>
        <NavItem onClick={() => navigate(-1)} justify="left">
          <BiChevronLeft />
        </NavItem>
        <NavItem>
          <Title color={TextColor}>{Text}</Title>
        </NavItem>
        {!NoRightItem && <NavBarRightItem isNew={isNew} />}
      </NavBar>
    );
  }
}

export default NavBarBasic;
