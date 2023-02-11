import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import FollowList from '../../Profile/FollowList/FollowList';

function SearchUser({ userList }) {
  return (
    <>
      {userList?.length > 0 ? (
        <FollowList users={userList} />
      ) : (
        <span>검색 결과를 찾을 수 없습니다.</span>
      )}
    </>
  );
}

export default SearchUser;
