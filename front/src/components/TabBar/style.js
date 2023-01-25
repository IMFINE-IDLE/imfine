import styled, { css } from 'styled-components';

const TabContainer = styled.div`
  width: 100%;
  height: 67px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--main-color);
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.05);
  display: grid;

  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: 'tab tab . tab tab';
`;

const Tab = styled.div``;

const TabCenter = styled.div``;

const TabImg = styled.img`
  ${({ src, width, height }) => css`
    src: ${src};
    width: ${width || '1em'};
    height: ${height || '1em'};
  `}
`;

const Clover = styled.img`
  &.bounce {
    animation: ;
  }
`;

export { TabContainer, Tab, TabCenter, TabImg, Clover };
