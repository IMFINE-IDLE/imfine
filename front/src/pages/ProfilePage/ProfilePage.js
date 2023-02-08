import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';
import Tabs from '../../components/Tabs/Tabs';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';
// import { axiosInstance } from '../../api/axiosInstance';

function ProfilePage() {
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // userInfo 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(api.profile.getUserInfo(uid), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      setUserInfo(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Tabs 자리에 표시할 각 탭별 렌더링 컴포넌트
  const tabArr = [
    {
      idx: 0,
      tabName: '달력',
      tabContent: <StatusCalendar uid={uid} />,
    },
    { idx: 1, tabName: '일기장', tabContent: <span>일기장</span> },
    { idx: 2, tabName: '구독중', tabContent: <span>구독중</span> },
  ];

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
        uid={uid}
      />

      <Tabs tabArr={tabArr} btnWidth="6.25em"></Tabs>

      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
