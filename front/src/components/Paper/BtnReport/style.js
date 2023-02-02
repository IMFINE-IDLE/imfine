import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const BtnSmall = styled.button`
  ${Btn}
  position: absolute;
  top: 24px;
  right: 0;
  width: 6rem;
  padding: 0em;
  height: 2.5rem;
  /* background-color: white; */
  /* color: var(--red-color); */
  color: white;
`;

export { BtnSmall };
