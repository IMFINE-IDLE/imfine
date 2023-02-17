import styled from 'styled-components';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
  margin-bottom: ${(props) => props.bottom || '6em'};
`;

const BoxHeader = styled.div`
  min-height: 150px;
  border-radius: 0px 0px 50px 50px;
  background-color: var(--light-color);
  outline: none;
  margin-bottom: ${(props) => props.bottom || '6em'};
`;

const TitleHeader = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1.5em;
  padding-left: 1em;
  white-space: nowrap;
`;

const SubTitleHeader = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1em;
  padding-top: 2em;
  padding-left: 1.5em;
  line-height: 1.5em;
  float: left;
`;

const BambooImg = styled.img.attrs({
  src: '/assets/images/Bamboo.png',
})`
  position: relative;
  right: 1em;
  bottom: 0.1em;
  width: 8em;
  height: 9em;
  float: right;
`;

const Content = styled.h1`
  color: var(--icon-color);
  padding: ${(props) => props.padding || '0px'};
  text-align: left;
  width: 100%;
  white-space: nowrap;
`;

export { BoxOuter, BoxHeader, TitleHeader, SubTitleHeader, BambooImg, Content };
