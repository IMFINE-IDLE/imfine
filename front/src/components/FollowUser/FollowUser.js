import React from 'react';
import { Clover } from '../common/Clover/Clover';
import { FollowUserBtn, FollowUserContainer, FollowUserWrapper } from './style';

const FollowUser = ({ cloverCode, name, type, followStatus }) => {
  if (type === 'following')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover code={cloverCode} width="3.75em" height="3.75em" />
          <span>{name}</span>
        </FollowUserWrapper>
        {followStatus === 0 || (
          <FollowUserBtn color={followStatus === 1 ? 'gray' : 'main'}>
            {followStatus === 1 ? '팔로잉' : '팔로우'}
          </FollowUserBtn>
        )}
      </FollowUserContainer>
    );
  else if (type === 'follower')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover code={cloverCode} width="3.75em" height="3.75em" />
          <span>{name}</span>
        </FollowUserWrapper>
        {followStatus === 0 || (
          <FollowUserBtn color={followStatus === 1 ? 'gray' : 'main'}>
            {followStatus === 1 ? '팔로잉' : '팔로우'}
          </FollowUserBtn>
        )}
      </FollowUserContainer>
    );
};

export default FollowUser;
