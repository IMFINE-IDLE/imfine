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

const Logo = styled.img`
  position: absolute;
  left: 2em;
  top: 1.5em;
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

export { NavBar, Logo, Search, Bell };
