import React, { useState } from 'react';
import api from '../../../api/api';
import { axiosInstance } from '../../../api/axiosInstance';
import { Clover } from '../../common/Clover/Clover';
import { FollowUserBtn, FollowUserContainer, FollowUserWrapper } from './style';

const FollowUser = ({
  cloverCode,
  name,
  type,
  followStatus,
  uid,
  setTrigger,
}) => {
  const [relation, setRelation] = useState(followStatus);

  const fetchChangeFollowStatus = async () => {
    try {
      if (relation === 1) {
        const res = await axiosInstance.delete(api.profile.unfollow(uid));

        console.log('unf', res);
        setRelation(2);
      } else if (relation === 2) {
        const res = await axiosInstance.post(api.profile.follow(), {
          otherUid: uid,
        });
        console.log('fo', res);
        setRelation(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // api 물어봐야 함
  const fetchUnfollow = async () => {
    try {
      const res = await axiosInstance.delete(api.profile.unfollow(uid));
      console.log(res);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  if (type === '팔로잉')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover code={cloverCode} width="3.75em" height="3.75em" />
          <span>{name}</span>
        </FollowUserWrapper>
        {relation === 0 || (
          <FollowUserBtn
            color={relation === 1 ? 'gray' : 'main'}
            onClick={fetchChangeFollowStatus}
          >
            {relation === 1 ? '팔로잉' : '팔로우'}
          </FollowUserBtn>
        )}
      </FollowUserContainer>
    );
  else if (type === '팔로워')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover code={cloverCode} width="3.75em" height="3.75em" />
          <span>{name}</span>
        </FollowUserWrapper>
        {followStatus === 0 || (
          <FollowUserBtn
            color={followStatus === 1 ? 'gray' : 'main'}
            // onClick={fetchDeleteFollower}
          >
            {followStatus === 1 ? '삭제' : ''}
          </FollowUserBtn>
        )}
      </FollowUserContainer>
    );
};

export default FollowUser;
