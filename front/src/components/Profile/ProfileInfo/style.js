import styled from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const ProfileInfoContainer = styled.div`
  min-width: 22em;
  width: 100%;
  display: flex;
  align-items: start;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  margin-left: 1em;
`;

const ProfileNickNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5em;
  padding-bottom: 1em;
`;

const ProfileFollowBtn = styled.button`
  ${Btn}
  width: 6.25em;
  height: 2.5em;
  padding: 0;
  color: var(--default-font-color);
  font-weight: 700;
`;

const ProfileItemSpan = styled.span`
  padding-right: 0.5em;
  font-weight: 700;
  display: inline-block;
`;

export {
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileNickNameWrapper,
  ProfileFollowBtn,
  ProfileItemSpan,
};
