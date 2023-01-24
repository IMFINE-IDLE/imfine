import React from 'react';
import styled from 'styled-components';
import LogoImg from '/assets/images/logo.png';
const NavBar = styled.div`
  position: absolute;
  width: 390px;
  height: 71px;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
`;

const Logo = styled.div`
  position: absolute;
  left: 24px;
  width: 118px;
  object-fit: contain;
`;

function NavBarBasic() {
  return (
    <NavBar>
      <Logo>
        <img src={LogoImg} alt="logo-img" />
      </Logo>
    </NavBar>
  );
}

export default NavBarBasic;
