import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { Btn } from '../../common/Btn/Btn';

const ProfileInfoContainer = styled(BoxNoShad)`
  display: flex;
  align-items: start;
  width: 100vw;
  height: 10em;
`;

const ProfileInfoWrapper = styled.div`
  min-width: 22em;
  width: 100%;
  display: flex;
  align-items: start;
`;

const ProfileNickNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileFollowBtn = styled.button`
  ${Btn}
`;

const ProfileItemSpan = styled.span`
  margin-right: 0.5em;
  font-weight: 700;
`;

export {
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileNickNameWrapper,
  ProfileFollowBtn,
  ProfileItemSpan,
};
