import styled from 'styled-components';
import { BoxShad } from '../../common/BoxShad/BoxShad';
const BoxBambooOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
`;

const BoxShadBamboo = styled(BoxShad)`
  height: 9em;
  padding: 1em;
  border-radius: 25px;
  margin: 2em 0;
  display: flex;
  min-width: 20em;
  flex-direction: column;
`;

const TextContent = styled.label`
  position: relative;
  font-weight: 400;
  font-size: 1em;
  margin: ${(props) => props.margin || '2em 1em 1em 1em'};
`;

const LabelOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LabelStatus = styled.label`
  font-weight: 400;
  font-size: 1em;
  padding: ${(props) => props.margin || '1em'};
`;

const BoxTimer = styled.div`
  padding: ${(props) => props.padding || '0px'};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 2em;
  flex-direction: row;
  position: relative;
  margin-top: -2.9em;
`;

const BasicBambooImg = styled.img.attrs({
  src: '/assets/images/BasicBamboo.png',
})`
  height: 1.5em;
  margin-top: 1.5em;
  margin-right: 0.2em;
`;

const LBBambooImg = styled.img.attrs({
  src: '/assets/images/LBBamboo.png',
})`
  height: 3em;
  margin-top: 1.5em;
  margin-right: 0.4em;
`;

const LTBambooImg = styled.img.attrs({
  src: '/assets/images/LTBamboo.png',
})`
  height: 3em;
  margin-right: 0.2em;
`;

const Blank = styled.div`
  padding: 2.5em;
  width: 100%;
`;
export {
  BoxBambooOuter,
  BoxShadBamboo,
  TextContent,
  LabelOuter,
  LabelStatus,
  BoxTimer,
  BasicBambooImg,
  LTBambooImg,
  LBBambooImg,
  Blank,
};
