import React from 'react';
import FollowUser from '../FollowUser/FollowUser';
import Tabs from '../Tabs/Tabs';
import { FollowsListContainer } from './style';

const ProfileFollows = () => {
  const FollowingList = () => {
    return (
      <>
        <FollowsListContainer>
          <FollowUser
            cloverCode={'1'}
            name={'nickname'}
            type={'follower'}
            followStatus={0}
          />
          <FollowUser
            cloverCode={'3'}
            name={'nickname'}
            type={'follower'}
            followStatus={1}
          />
          <FollowUser
            cloverCode={'5'}
            name={'nickname'}
            type={'follower'}
            followStatus={2}
          />
        </FollowsListContainer>
      </>
    );
  };
  const FollowerList = () => {
    return <span>팔로워</span>;
  };

  const tabArr = [
    { idx: 0, tabName: '팔로잉', tabContent: <FollowingList /> },
    { idx: 1, tabName: '팔로워', tabContent: <FollowerList /> },
  ];

  return (
    <div>
      <Tabs tabArr={tabArr} btnWidth="8.75em"></Tabs>
    </div>
  );
};

export default ProfileFollows;
