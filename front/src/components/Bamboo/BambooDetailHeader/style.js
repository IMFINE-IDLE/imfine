import styled from 'styled-components';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
  margin-bottom: ${(props) => props.bottom || '6em'};
`;

const BoxHeader = styled.div`
  height: 7em;
  border-radius: 0px 0px 50px 50px;
  background-color: var(--light-color);
  outline: none;
`;

const Content = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1.5em;
  padding-top: 2.8em;
  padding-left: 1em;
`;

const BambooImg = styled.img.attrs({
  src: '/assets/images/Bamboo.png',
})`
  position: relative;
  right: 1em;
  bottom: 0.1em;
  width: 5em;
  height: 5em;
  float: left;
`;
export { BoxOuter, BoxHeader, Content, BambooImg };
