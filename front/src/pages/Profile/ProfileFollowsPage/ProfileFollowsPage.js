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
  ProfileFollowActiveBar,
} from './style';

const ProfileFollowsPage = () => {
  const { uid } = useParams();
  const { name, open, condition, type, followingCount, followerCount } =
    useLocation().state;
  const [users, setUsers] = useState(null);
  const [followType, setFollowType] = useState(type); // '팔로잉' 또는 '팔로워'
  const [followingCnt, setFollowingCnt] = useState(followingCount);
  const [followerCnt, setFollowerCnt] = useState(followerCount);

  const [trigger, setTrigger] = useState(false); // 목록에 변화가 생겼을 때 다시 렌더링하기 위한 트리거 변수

  // 팔로잉 또는 팔로워 목록 가져오기
  const fetchFollowList = async () => {
    try {
      if (followType === '팔로잉') {
        const res = await axios.get(api.profile.getFollowingList(uid));
        setUsers(() => res.data.data);
        setFollowingCnt(res.data.data.length);
      } else if (followType === '팔로워') {
        const res = await axios.get(api.profile.getFollowerList(uid));
        setUsers(() => res.data.data);
        setFollowerCnt(res.data.data.length);
      }
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
            <FlexDiv style={{ position: 'relative' }}>
              <FlexDiv justify="end" onClick={() => setFollowType('팔로잉')}>
                <ProfileItemSpan pointer={true}>팔로잉</ProfileItemSpan>
                <ProfileItemSpan pointer={true}>
                  {followingCnt >= 1000
                    ? parseInt(followingCnt / 1000) + 'k'
                    : followingCnt}
                </ProfileItemSpan>
              </FlexDiv>
              {followType === '팔로잉' && (
                <ProfileFollowActiveBar left={true} />
              )}
            </FlexDiv>

            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>
            <ProfileItemSpan></ProfileItemSpan>

            <FlexDiv style={{ position: 'relative' }}>
              <FlexDiv justify="start" onClick={() => setFollowType('팔로워')}>
                <ProfileItemSpan pointer={true}>팔로워</ProfileItemSpan>
                <ProfileItemSpan pointer={true}>
                  {followerCnt >= 1000
                    ? parseInt(followerCnt / 1000) + 'k'
                    : followerCnt}
                </ProfileItemSpan>
              </FlexDiv>
              {followType === '팔로워' && <ProfileFollowActiveBar />}
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
