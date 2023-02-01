import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  // 임시
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjc1MjM5NzA0LCJleHAiOjE2NzU4NDQ1MDR9.V6cppFBOd18kOsr5CKm2ZsSY_jYO_PezMpAvq7ClyFM';
  // 임시
  const fetchUrl = `http://i8A809.p.ssafy.io:8080/user/${params.name}`;
  // const fetchUrl = `http://i8A809.p.ssafy.io:8080/user/${'user12'}`;

  const fetchUserInfo = async () => {
    try {
      // 요청 시작시 error 와 userInfo 를 초기화하고
      setError(null);
      setUserInfo(null);
      // loading 상태를 true 로 바꾼다.
      setLoading(true);

      // axios 요청
      const response = await axios.get(fetchUrl, {
        headers: { 'X-AUTH-TOKEN': token },
      });

      // response.data 안에 들어있는 data를 users 에 저장
      setUserInfo(response.data.data);
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUrl]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  // 아직 users 가 받아와지지 않았을 때는 아무것도 표시하지 않음.
  if (!userInfo) return null;

  return (
    <div>
      <NavBarBasic />
      <ProfileInfo
        condition={userInfo.condition}
        name={userInfo.name}
        open={userInfo.open}
        followingCount={userInfo.followingCount}
        followerCount={userInfo.followerCount}
        relation={userInfo.relation}
      />
      <Outlet />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
