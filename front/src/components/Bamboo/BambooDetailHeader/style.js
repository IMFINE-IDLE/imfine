import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
  margin-bottom: ${(props) => props.bottom || '1em'};
`;

const BoxHeader = styled(BoxNoShad)`
  border-radius: 0px 0px 50px 50px;
  padding: 1em 1em 1em 1em;
  background-color: var(--light-color);
  outline: none;
  min-height: 190px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightDiv = styled.div`
  height: 5em;
  position: relative;
  bottom: 0;
`;
const BambooImg = styled.img.attrs({
  src: '/assets/images/Bamboo.png',
})`
  width: 5em;
  margin-left: 1em;
  height: 5em;
`;

const Content = styled.h1`
  color: var(--default-font-color);
  padding: 1.8em;
  text-align: left;
`;

const LabelOuter = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-top: 2em;
  margin-right: 1em;
`;

const LabelStatus = styled.label`
  font-weight: 400;
  font-size: 1em;
  padding: ${(props) => props.margin || '1em'};
`;

const Container = styled.div`
  width: inherit;
  margin: 2em;
  position: relative;
  display: inline-block;
  top: -12em;
  float: right;
`;

const ReplyContainer = styled.div`
  padding-top: 1em;
  padding-left: 1em;
`;
export {
  BoxOuter,
  BoxHeader,
  Content,
  RightDiv,
  BambooImg,
  LabelOuter,
  LabelStatus,
  Container,
  ReplyContainer,
  TopDiv,
  BottomDiv,
};
