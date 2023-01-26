import { NavBar, Back, Search, Bell } from './style';
import React from 'react';

function NavBarBack() {
  return (
    <NavBar>
      <Back src="/assets/icons/chevron-left.svg" alt="chevron-left-img" />
      <Search src="/assets/icons/search.svg" alt="search-img" />
      <Bell src="/assets/icons/bell.svg" alt="bell-img" />
    </NavBar>
  );
}

export default NavBarBack;
