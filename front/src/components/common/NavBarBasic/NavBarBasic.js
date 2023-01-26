import { NavBar, LeftItem, Title, Search, Bell } from './Style';
import React from 'react';

function NavBarBasic({ Back, Text }) {
  // Back: boolean parameter
  // Back == false면 로고있는 네비게이션 바
  // Back == true면 backbutton 있는 네비게이션 바
  if (!Back) {
    return (
      <NavBar>
        <LeftItem src="/assets/images/logo.svg" alt="logo-img" />
        <Title visibility="hidden" />
        <Search src="/assets/icons/search.svg" alt="search-img" />
        <Bell src="/assets/icons/bell.svg" alt="bell-img" />
      </NavBar>
    );
  } else {
    return (
      <NavBar>
        <LeftItem
          width="24px"
          height="24px"
          top="1.7em"
          src="/assets/icons/chevron-left.png"
          alt="leftItem"
        />
        <Title>{Text}</Title>
        <Search src="/assets/icons/search.svg" alt="search-img" />
        <Bell src="/assets/icons/bell.svg" alt="bell-img" />
      </NavBar>
    );
  }
}

export default NavBarBasic;
