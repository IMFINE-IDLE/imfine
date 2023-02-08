import styled from 'styled-components';
import { BoxGrad } from '../../common/BoxGrad/BoxGrad';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';

const ProfileFollowContainer = styled(BoxGrad)`
  background: linear-gradient(#ffffff, var(--main-color) 80%);
  height: calc(100vh - var(--nav-height));
  position: relative;
`;

const ProfileFollowListContainer = styled(BoxNoShad)`
  position: absolute;
  bottom: 0;
  width: calc(100% - 4em);
  background-color: #ffffff;
`;

const ProfileFollowListWrapper = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export {
  ProfileFollowContainer,
  ProfileFollowListContainer,
  ProfileFollowListWrapper,
};
