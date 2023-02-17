import styled from 'styled-components';

const BoxNavBar = styled.div`
  position: fixed;
  width: 100%;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0 1em;
  background-color: ${(props) =>
    'var(--' + props.color + '-color)' || 'var(--gray-color)'};
  z-index: 997;
`;

const BoxChevronLeft = styled.div``;

const BoxSearchInput = styled.div`
  display: flex;
  background-color: var(--light-color);
  border-radius: 50px;
  flex: 1;
  margin: 0 1em;
  padding-left: 1em;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5em;
  margin-right: 1em;
`;

export { BoxNavBar, BoxChevronLeft, BoxSearchInput, SearchInput };
