import styled from 'styled-components';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
`;

const BoxHeader = styled.div`
  height: 15em;
  border-radius: 0px 0px 50px 50px;
  background-color: var(--light-color);
  outline: none;
`;

const TitleHeader = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1.5em;
  padding-top: 2.8em;
  padding-left: 1em;
`;

const SubTitleHeader = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1em;
  padding-top: 2em;
  padding-left: 1.5em;
  line-height: 1.5em;
`;

export { BoxOuter, BoxHeader, TitleHeader, SubTitleHeader };
