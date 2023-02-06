import React from 'react';
import { NavBar, NavItem, Logo, Title, Search, Bell } from './style';
import { useNavigate, NavLink } from 'react-router-dom';
import { BiChevronLeft, BiSearch, BiBell } from 'react-icons/bi';
import NavBarRightItem from './NavBarRightItem';
function NavBarBasic({ BackgroundColor, TextColor, Back, Text }) {
  // ** [0209] ** 기존 props의 path값은 삭제되었습니다.

  // Back: boolean parameter
  // Back == false면 로고있는 네비게이션 바
  // Back == true면 뒤로가기버튼있는 네비게이션 바
  // <NavBarBasic Back={true} Text={'네비게이션 바 타이틀 값'} />

  // BackgroundColor : 네비게이션 바 배경색상
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
        <NavBarRightItem />
      </NavBar>
    );
  } else {
    return (
      <NavBar color={BackgroundColor}>
        <NavItem
          onClick={() => {
            navigate(-1);
          }}
          justify="left"
        >
          <BiChevronLeft />
        </NavItem>
        <NavItem>
          <Title color={TextColor}>{Text}</Title>
        </NavItem>
        <NavBarRightItem />
      </NavBar>
    );
  }
}

export default NavBarBasic;
