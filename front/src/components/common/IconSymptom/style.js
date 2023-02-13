import styled from 'styled-components';
import { Btn } from '../Btn/Btn';

// const BoxIcon = styled.div`
//   display: flex;
//   /* justify-content: center; */
//   align-items: center;
//   flex-direction: column;
//   width: 70px;
//   cursor: pointer;
//   margin: 0.5em auto;
// `;

const BoxIcon = styled.div`
  width: 25%;
`;

const BoxImg = styled.div`
  ${Btn}
  height: 70px;
`;

const TextImg = styled.p`
  font-size: 12px;
  color: var(--icon-color);
  margin-top: 0.5em;
  text-align: center;
`;

export { BoxIcon, BoxImg, TextImg };
