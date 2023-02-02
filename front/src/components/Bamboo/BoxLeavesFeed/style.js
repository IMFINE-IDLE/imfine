import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';

const BoxNoShadLeaves = styled(BoxNoShad)`
  height: 9em;
  padding: 1em;
  border-radius: 25px;
  margin: 2em 0;
  display: flex;
  min-width: 20em;
  flex-direction: column;
`;

const ImgLeaves = styled.img.attrs({
  src: `/assets/images/BambooReply.png`,
})`
  height: 3em;
  width: 3em;
  margin: 1em 0.5em 1em 1em;
`;
export { BoxNoShadLeaves, ImgLeaves };
