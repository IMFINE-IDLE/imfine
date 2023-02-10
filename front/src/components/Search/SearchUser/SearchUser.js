import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import FollowList from '../../Profile/FollowList/FollowList';

function SearchUser({ currentQuery }) {
  const [userList, setUserList] = useState([]);

  // 유저 검색
  const handleUserSearch = async () => {
    try {
      const res = await axios.get(api.search.search('user', currentQuery));
      console.log(res.data);
      setUserList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleUserSearch();
  }, []);

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
