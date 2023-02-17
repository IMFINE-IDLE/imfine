import styled from 'styled-components';
import { Btn } from '../Btn/Btn';

const BoxImg = styled.div`
  ${Btn}
  width: 4em;
  height: 4em;
  box-shadow: ${(props) => props.clicked && '0 0 10px #A9D7D0'};
`;

const TextImg = styled.p`
  font-size: 12px;
  color: var(--icon-color);
  margin-top: 0.5em;
  text-align: center;
`;

export { BoxImg, TextImg };
