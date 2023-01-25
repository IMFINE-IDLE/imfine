import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  position: absolute;
  width: 100%;
  height: ${(props) => props.height || '71px'};
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
`;

const Back = styled.img`
  position: absolute;
  left: 1em;
  width: 24px;
  height: 24px;
  top: 1.7em;
  bottom: 1.5em;
  width: 118px;
  object-fit: contain;
`;

const Search = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 5em;
  top: 1.7em;
`;

const Bell = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 1.5em;
  top: 1.7em;
`;

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
