import React from 'react';
import { Clover } from '../common/Clover/Clover';
import { FollowUserBtn, FollowUserContainer } from './style';

const FollowUser = ({ cloverCode, name, type, followStatus }) => {
  return (
    <FollowUserContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Clover code={cloverCode} width="3.75em" height="3.75em" />
        <span>{name}</span>
      </div>
      <FollowUserBtn>{}</FollowUserBtn>
    </FollowUserContainer>
  );
};

export default FollowUser;
