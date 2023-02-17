import styled from 'styled-components';
import { BoxGrad } from '../../../components/common/BoxGrad/BoxGrad';
import { BoxNoShad } from '../../../components/common/BoxNoShad/BoxNoShad';

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
  height: calc(100% - 1.5em);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProfileFollowActiveBar = styled.div`
  width: 4.8em;
  height: 0.3em;
  background-color: var(--main-color);
  position: absolute;
  top: 1.3em;
  right: ${(props) => props.left && '0'};
  left: ${(props) => props.left || '-0.5em'};
  border-radius: 0 0 0.2em 0.2em;
`;

export {
  ProfileFollowContainer,
  ProfileFollowListContainer,
  ProfileFollowListWrapper,
  ProfileFollowActiveBar,
};
