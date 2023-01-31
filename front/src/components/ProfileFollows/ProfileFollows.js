import React from 'react';
import FollowUser from '../FollowUser/FollowUser';
import Tabs from '../Tabs/Tabs';

const ProfileFollows = () => {
  const FollowingList = () => {
    return (
      <>
        <FollowUser cloverCode={'1'} name={'nickname'} />
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
