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
      // 내가 현재 팔로중이면 언팔로우 요청을 보내고 relation을 3으로 변경
      if (relation === 1) {
        await axiosInstance.delete(api.profile.unfollow(uid));
        setRelation(3);
      }
      // 현재 팔로우하고 있지 않으면 팔로우 요청을 보니고 relation을 1로 변경
      else if (relation === 3) {
        await axiosInstance.post(api.profile.follow(), { uid });
        setRelation(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // // api 물어봐야 함
  // const fetchDeletefollower = async () => {
  //   try {
  //     const res = await axiosInstance.delete(api.profile.deleteFollower(uid));
  //     console.log(res);
  //     setTrigger((prev) => !prev);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (type === '팔로잉')
    return (
      <FollowUserContainer>
        <FollowUserWrapper>
          <Clover code={cloverCode} width="3.75em" height="3.75em" />
          <span>{name}</span>
        </FollowUserWrapper>
        {relation === 0 || (
          <FollowUserBtn
            color={relation === 3 ? 'main' : 'gray'}
            onClick={fetchChangeFollowStatus}
          >
            {relation === 1 ? '언팔로우' : relation === 2 ? '요청됨' : '팔로우'}
          </FollowUserBtn>
        )}
      </FollowUserContainer>
    );
  else
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
