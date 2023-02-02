import styled from 'styled-components';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
  margin-bottom: ${(props) => props.bottom || '1em'};
`;

const BoxHeader = styled.div`
  height: 12em;
  border-radius: 0px 0px 50px 50px;
  background-color: var(--light-color);
  outline: none;
`;

const BambooImg = styled.img.attrs({
  src: '/assets/images/Bamboo.png',
})`
  width: 5em;
  margin-left: 1em;
  height: 5em;
  float: left;
  margin-bottom: 1em;
`;

const RightDiv = styled.div`
  height: 5em;
  margin: ${(props) => props.margin || '1em 0 0 '};
`;

const Content = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1em;
  min-width: 15em;
  padding: 1.7em 1em 1.2em;
  text-align: justify;
  top: 1.3em;
  position: relative;
`;

const LabelOuter = styled.div`
  float: right;
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
  margin: 1em;
  position: relative;
  display: inline-block;
  top: -12em;
  float: right;
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
};
