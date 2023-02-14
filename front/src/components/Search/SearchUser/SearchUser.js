import React from 'react';
import FollowList from '../../Profile/FollowList/FollowList';

function SearchUser({ userList }) {
  return (
    <>
      {userList?.length > 0 ? (
        <FollowList users={userList} type="팔로잉" setTrigger={true} />
      ) : (
        <span>검색 결과를 찾을 수 없습니다.</span>
      )}
    </>
  );
}

export default SearchUser;
