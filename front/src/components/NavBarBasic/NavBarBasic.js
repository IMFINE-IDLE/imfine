import { NavBar, NavItem, Logo, Title, Search, Bell } from './Style';
import { NavLink } from 'react-router-dom';
import { BiChevronLeft, BiSearch, BiBell } from 'react-icons/bi';
import React from 'react';

function NavBarBasic({ Back, Text, path }) {
  // Back: boolean parameter
  // Back == false면 로고있는 네비게이션 바
  // Back == true면 backbutton 있는 네비게이션 바
  // <NavBarBasic Back={true} Text={'네비게이션 바 타이틀 값'} />
  // path는 추후 페이지 연결시 지정하는 경로로 넘겨줄 값
  if (!Back) {
    return (
      <NavBar>
        <NavItem justify="left">
          <NavLink to="/">
            <Logo src="/assets/images/logo.svg" alt="logo-img" />
          </NavLink>
        </NavItem>
        <NavItem justify="center">
          <Title display="none">{Text}</Title>
        </NavItem>
        <NavItem>
          <NavLink to="/">
            <BiSearch />
          </NavLink>
        </NavItem>
        <NavItem right="1em">
          <NavLink to="/">
            <BiBell />
          </NavLink>
        </NavItem>
      </NavBar>
    );
  } else {
    return (
      <NavBar>
        <NavItem justify="left">
          <NavLink to="/">
            <BiChevronLeft />
          </NavLink>
        </NavItem>
        <NavItem>
          <Title>{Text}</Title>
        </NavItem>
        <NavItem>
          <NavLink to="/">
            <BiSearch />
          </NavLink>
        </NavItem>
        <NavItem right="1em">
          <NavLink to="/">
            <BiBell />
          </NavLink>
        </NavItem>
      </NavBar>
    );
  }
}

export default NavBarBasic;
