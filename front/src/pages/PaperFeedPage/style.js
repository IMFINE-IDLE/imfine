import styled from 'styled-components';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';

const BoxPaperFeed = styled.div`
  position: relative;
  padding: 0 1em 1em;
`;

const Circle = styled(BoxGrad)`
  position: absolute;
  top: ${(prop) => (prop.small ? '0' : null)};
  right: ${(prop) => (prop.small ? '-150px' : null)};
  left: ${(prop) => (prop.small ? null : '-230px')};
  bottom: ${(prop) => (prop.small ? null : '650px')};
  width: ${(prop) => (prop.small ? '300px' : '500px')};
  height: ${(prop) => (prop.small ? '300px' : '500px')};
  border-radius: 50%;
  z-index: -1;
`;

export { BoxPaperFeed, Circle };
