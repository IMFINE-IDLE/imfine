import React, { useEffect } from 'react';
import FollowUser from '../FollowUser/FollowUser';
import { FollowListContainer } from './style';

// user정보 객체들을 담은 배열을 users로 넘겨줄 것
// type은 'following' 또는 'follower' (디폴트는 'following')
const FollowList = ({ users, type }) => {
  return (
    <>
      <FollowListContainer>
        {users?.map((user) => (
          <FollowUser
            cloverCode={user.condition}
            name={user.name}
            type={type}
            followStatus={user.relation}
            key={user.uid}
          />
        ))}
      </FollowListContainer>
    </>
  );
};

export default FollowList;
