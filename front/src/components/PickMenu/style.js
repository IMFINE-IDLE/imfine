import styled from 'styled-components';

const BoxPickMenu = styled.div`
  width: 100%;
  /* margin-top: -2.5em; */
  padding: 0 1em 1em;
  /* background-color: var(--gray-color); */
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  /* align-items: center; */
`;

const BtnRequest = styled.a`
  margin-top: 1em;
  font-size: 12px;
  color: var(--icon-color);
`;

export { BoxPickMenu, BtnRequest };
