import styled from 'styled-components';
import { Btn } from '../Btn/Btn';

const BoxImg = styled.div`
  ${Btn}
  width: 4em;
  height: 4em;
`;

const TextImg = styled.p`
  font-size: 12px;
  color: var(--icon-color);
  margin-top: 0.5em;
  text-align: center;
`;

export { BoxImg, TextImg };
