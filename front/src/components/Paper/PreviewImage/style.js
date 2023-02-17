import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const Img = styled.img`
  width: 5em;
  height: 5em;
`;
const RemoveBtn = styled.span`
  ${Btn}
  display: inline-block;
  max-width: 6.2em;
  padding: 0.3em;
`;

export { Img, RemoveBtn };
