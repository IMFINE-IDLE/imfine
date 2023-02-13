import styled from 'styled-components';

const NavBar = styled.div`
  width: 100%;
  height: ${(props) => props.height || '65px'};
  display: grid;
  grid-template-columns: 2fr 4fr 1fr 1fr;
  background-color: ${(props) =>
    'var(--' + props.color + '-color)' || 'var(--gray-color)'};
`;

const NavItem = styled.div`
  margin-left: 1em;
  margin-right: ${(props) => props.right || '0px'};
  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: center;
`;

const Logo = styled.img`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '50px'};
  display: ${(props) => props.display || 'inline'};
`;

const Title = styled.div`
  color: ${(props) =>
    'var(--' + props.color + '-color)' || 'var(--icon-color)'};
  font-size: 1em;
  top: 1.5em;
  bottom: 0.5em;
  display: ${(props) => props.display || 'flex'};
  right: 12em;
  font-weight: 700;
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

export { NavBar, NavItem, Logo, Title, Search, Bell };
