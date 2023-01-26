import { NavBar, Logo, Search, Bell } from './Style';
import React from 'react';

function NavBarBasic() {
  return (
    <NavBar>
      <Logo src="/assets/images/logo.svg" alt="logo-img" />
      <Search src="/assets/icons/search.svg" alt="search-img" />
      <Bell src="/assets/icons/bell.svg" alt="bell-img" />
    </NavBar>
  );
}

export default NavBarBasic;
