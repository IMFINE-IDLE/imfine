import styled from 'styled-components';

const BoxTimer = styled.div`
  padding: ${(props) => props.padding || '0px'};
  display: flex;
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justify || 'flex-start'};
  height: 2em;
  flex-direction: row;
  position: relative;
  margin-top: -2.9em;
`;

const BasicBambooImg = styled.img.attrs({
  src: '/assets/images/BasicBamboo.png',
})`
  height: 60%;
  width: 100%;
  margin-top: 1.2em;
  margin-right: 0;
  flex-basis: 0;
  flex-shrink: 0;
`;

const LBBambooImg = styled.img.attrs({
  src: '/assets/images/LBBamboo.png',
})`
  height: 120%;
  width: 100%;
  margin-top: 1.2em;
  margin-right: 0.3em;
  flex-basis: 0;
  flex-shrink: 0;
`;

const LTBambooImg = styled.img.attrs({
  src: '/assets/images/LTBamboo.png',
})`
  height: 120%;
  width: 100%;
  margin-right: 0.1em;
  flex-basis: 0;
  flex-shrink: 0;
`;

export { BoxTimer, BasicBambooImg, LTBambooImg, LBBambooImg };
