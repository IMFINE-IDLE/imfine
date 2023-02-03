import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { InputGray } from '../../common/InputGray/InputGray';
const ReplyDiv = styled(BoxNoShad)`
  border-radius: 25px 25px 0px 0px;
  padding: 0.3em;
  background-color: var(--light-color);
  outline: none;
  height: 3.8em;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ReplyInput = styled(InputGray)`
  width: 100%;
  height: 100%;
  margin: 0.5em;
`;
export { ReplyDiv, ReplyInput };
