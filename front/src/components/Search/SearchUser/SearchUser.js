import React from 'react';
import FollowList from '../../Profile/FollowList/FollowList';
import SearchNoResult from '../SearchNoResult/SearchNoResult';

function SearchUser({ userList }) {
  return (
    <>
      {userList?.length > 0 ? (
        <FollowList users={userList} type="팔로잉" setTrigger={true} />
      ) : (
        <SearchNoResult />
      )}
    </>
  );
}

export default SearchUser;
