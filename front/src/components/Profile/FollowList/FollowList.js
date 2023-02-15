import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FollowUser from '../FollowUser/FollowUser';
import { FollowListContainer } from './style';

// user정보 객체들을 담은 배열을 users로 넘겨줄 것
// type은 'following' 또는 'follower' (디폴트는 'following')
const FollowList = ({ users, type, setTrigger, noFollowButton }) => {
  const { uid } = useParams();
  const isMine = Boolean(uid === useSelector((state) => state.user.uid));

  return (
    <>
      <FollowListContainer>
        {users?.map((user) => (
          <FollowUser
            cloverCode={user.condition}
            name={user.name}
            type={type}
            relation={user.relation}
            uid={user.uid}
            setTrigger={setTrigger}
            key={user.uid}
            noFollowButton={noFollowButton}
            isMine={isMine}
          />
        ))}
      </FollowListContainer>
    </>
  );
};

export default FollowList;
