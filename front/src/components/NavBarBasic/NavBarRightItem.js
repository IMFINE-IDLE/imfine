import { NavItem } from './style';
import { NavLink } from 'react-router-dom';
import { BiSearch, BiBell } from 'react-icons/bi';
import React from 'react';

function NavBarRightItem() {
  return (
    <>
      <NavItem>
        <NavLink to="/search">
          <BiSearch />
        </NavLink>
      </NavItem>
      <NavItem right="1em">
        <NavLink to="/notifications">
          <BiBell />
        </NavLink>
      </NavItem>
    </>
  );
}

export default NavBarRightItem;
