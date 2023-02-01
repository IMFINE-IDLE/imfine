import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowUser from '../Profile/FollowUser/FollowUser';
import { FollowsListContainer } from './style';

const FollowingList = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjc1MjI1MzI3LCJleHAiOjE2NzU4MzAxMjd9.7z-KlM4QvBcfoese5jeH7YvXKkuC3Qg_q73oBEId7OY';

  const fetchFollowings = async () => {
    try {
      // 요청 시작시 error 와 users 를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true 로 바꾼다.
      setLoading(true);

      // axios 요청
      const response = await axios.get(
        `http://i8A809.p.ssafy.io:8080/user/${'user12'}/following`,
        { headers: { 'X-AUTH-TOKEN': token } }
      );

      // response.data 안에 들어있는 data를 users 에 저장
      setUsers(response.data.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFollowings();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  // 아직 users 가 받아와지지 않았을 때는 아무것도 표시하지 않음.
  if (!users) return null;

  return (
    <>
      <FollowsListContainer>
        {users.map((user) => (
          <FollowUser
            cloverCode={'0'}
            name={user.name}
            type={'following'}
            followStatus={user.relation}
            key={user.uid}
          />
        ))}
      </FollowsListContainer>
    </>
  );
};

export default FollowingList;
