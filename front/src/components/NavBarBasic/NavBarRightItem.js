import { NavItem } from './style';
import { NavLink } from 'react-router-dom';
import { BiSearch, BiBell } from 'react-icons/bi';
import React from 'react';

function NavBarRightItem({ isNew }) {
  return (
    <>
      {isNew ? (
        <>
          <NavItem>
            <NavLink to="/search">
              <BiSearch />
            </NavLink>
          </NavItem>
          <NavItem right="1em">
            <NavLink to="/noti">
              <BiBell
                style={{
                  color: 'var(--red-color)',
                }}
              />
            </NavLink>
          </NavItem>
        </>
      ) : (
        <>
          <NavItem>
            <NavLink to="/search">
              <BiSearch />
            </NavLink>
          </NavItem>
          <NavItem right="1em">
            <NavLink to="/noti">
              <BiBell />
            </NavLink>
          </NavItem>
        </>
      )}
    </>
  );
}

export default NavBarRightItem;
