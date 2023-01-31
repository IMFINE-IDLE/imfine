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

export { BoxTimer, BasicBambooImg, LTBambooImg, LBBambooImg };
