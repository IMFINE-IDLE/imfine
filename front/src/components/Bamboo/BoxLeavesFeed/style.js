import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';

const BoxNoShadLeaves = styled(BoxNoShad)`
  min-height: 9em;
  padding: 1em;
  margin: 1em;
  border-radius: 25px;
`;

const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImgLeaves = styled.img.attrs({
  src: `/assets/images/BambooReply.png`,
})`
  height: 3em;
  width: 3em;
  margin-right: 1.5em;
`;

const Content = styled.div`
  padding: 1em 0 1em 0;
  color: var(--icon-color);
`;

const LikeLabel = styled.label`
  font-weight: 400;
  color: var(--icon-color);
  margin 0 0.2em 0 0.4em 
`;
export {
  BoxNoShadLeaves,
  ImgLeaves,
  ColumnDiv,
  TopDiv,
  BottomDiv,
  Content,
  LikeLabel,
};
