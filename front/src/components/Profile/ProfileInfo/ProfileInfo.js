import React from 'react';
import { useSelector } from 'react-redux';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { Clover } from '../../common/Clover/Clover';
import {
  ProfileFollowBtn,
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileItemSpan,
  ProfileNickNameWrapper,
} from './style';

const ProfileInfo = ({
  condition,
  name,
  open,
  followingCount,
  followerCount,
  relation,
}) => {
  const state = useSelector((state) => state);

  return (
    <BoxNoShad color="light" radius="0" style={{ paddingBottom: '6.7em' }}>
      <ProfileInfoContainer>
        <Clover code={state.userInfo.cloverCode} width="4.2em" height="4.2em" />

        <ProfileInfoWrapper>
          <ProfileNickNameWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileItemSpan style={{ fontSize: '1.5em' }}>
                {name}
              </ProfileItemSpan>
              {open || (
                <img
                  src="/assets/icons/lock.svg"
                  alt="lock"
                  style={{ position: 'inline' }}
                />
              )}
            </div>
            <div style={{ height: '2.5em' }}>
              {relation === 0 ? (
                <img src="/assets/icons/more-vertical.svg" alt="more" />
              ) : (
                <ProfileFollowBtn color={relation === 1 ? 'gray' : 'main'}>
                  {relation === 1 ? '팔로잉' : '팔로우'}
                </ProfileFollowBtn>
              )}
            </div>
          </ProfileNickNameWrapper>

          <div>
            <ProfileItemSpan>팔로잉</ProfileItemSpan>
            <ProfileItemSpan>
              {followingCount >= 1000
                ? parseInt(followingCount / 1000) + 'k'
                : followingCount}
            </ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan>팔로워</ProfileItemSpan>
            <ProfileItemSpan>
              {followerCount >= 1000
                ? parseInt(followerCount / 1000) + 'k'
                : followerCount}
            </ProfileItemSpan>
          </div>
        </ProfileInfoWrapper>
      </ProfileInfoContainer>
    </BoxNoShad>
  );
};

export default ProfileInfo;
