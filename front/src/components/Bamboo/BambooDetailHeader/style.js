import styled from 'styled-components';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
  margin-bottom: ${(props) => props.bottom || '6em'};
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
  position: relative;
  left: 1.5em;
  width: 5em;
  height: 5em;
  float: left;
  top: 7em;
`;

const Content = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1em;
  min-width: 15em;
  padding-top: 2.8em;
  padding-left: 6em;
  padding-right: 6em;
`;

const LabelOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  top: 5em;
  right: 1em;
  position: relative;
`;

const LabelStatus = styled.label`
  font-weight: 400;
  font-size: 1em;
  padding: ${(props) => props.margin || '1em'};
`;
export { BoxOuter, BoxHeader, Content, BambooImg, LabelOuter, LabelStatus };
