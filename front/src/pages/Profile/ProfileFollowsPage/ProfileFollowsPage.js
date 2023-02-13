import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api/api';
import FollowList from '../../../components/Profile/FollowList/FollowList';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import { Clover } from '../../../components/common/Clover/Clover';
import { ProfileItemSpan } from '../../../components/Profile/ProfileInfo/style';
import {
  ProfileFollowContainer,
  ProfileFollowListContainer,
  ProfileFollowListWrapper,
} from './style';

const ProfileFollowsPage = () => {
  const { uid } = useParams();
  const { name, open, condition, type, followingCount, followerCount } =
    useLocation().state;
  const [users, setUsers] = useState(null);
  const [followType, setFollowType] = useState(type); // '팔로잉' 또는 '팔로워'
  const [trigger, setTrigger] = useState(false); // 목록에 변화가 생겼을 때 다시 렌더링하기 위한 트리거 변수

  // 팔로잉 또는 팔로워 목록 가져오기
  const fetchFollowList = async () => {
    const url =
      followType === '팔로워'
        ? api.profile.getFollowerList(uid)
        : api.profile.getFollowingList(uid);

    try {
      const res = await axios.get(url);

      setUsers(() => res.data.data);
      console.log('fetchfollowList res', res.data.data);
      console.log('fetchfollowList users', users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFollowList();
  }, [followType, trigger]);

  if (!users) return null;

  return (
    <>
      <NavBarBasic Back={true} />
      <ProfileFollowContainer radius="0" padding="0 2em">
        <FlexDiv direction="column" height="auto">
          <Clover code={condition} width="6.5em" height="6.5em" />
          <FlexDiv>
            <ProfileItemSpan>{name}</ProfileItemSpan>
            {open || (
              <img
                src="/assets/icons/lock.svg"
                alt="lock"
                style={{ position: 'inline' }}
              />
            )}
          </FlexDiv>
          <FlexDiv padding="1.2em">
            <FlexDiv justify="end" onClick={() => setFollowType('팔로잉')}>
              <ProfileItemSpan pointer={true}>팔로잉</ProfileItemSpan>
              <ProfileItemSpan pointer={true}>
                {followingCount >= 1000
                  ? parseInt(followingCount / 1000) + 'k'
                  : followingCount}
              </ProfileItemSpan>
            </FlexDiv>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>

            <FlexDiv justify="start" onClick={() => setFollowType('팔로워')}>
              <ProfileItemSpan pointer={true}>팔로워</ProfileItemSpan>
              <ProfileItemSpan pointer={true}>
                {followerCount >= 1000
                  ? parseInt(followerCount / 1000) + 'k'
                  : followerCount}
              </ProfileItemSpan>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <ProfileFollowListContainer
          height="70%"
          padding="3em 1em 0 0"
          radius="50px 50px 0 0"
        >
          <ProfileFollowListWrapper>
            <FollowList
              users={users}
              type={followType}
              setTrigger={setTrigger}
            />
          </ProfileFollowListWrapper>
        </ProfileFollowListContainer>
      </ProfileFollowContainer>
    </>
  );
};

export default ProfileFollowsPage;
