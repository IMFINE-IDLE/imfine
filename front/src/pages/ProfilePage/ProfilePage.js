import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';
import Tabs from '../../components/Tabs/Tabs';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';
import { axiosInstance } from '../../api/axiosInstance';

function ProfilePage() {
  //////////// Hooks //////////////
  const [userInfo, setUserInfo] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 프로필에 표시한 유저 정보를 가져와서 userInfo state에 저장
  // axiosInstance 사용하도록 변경
  // 기존
  // const fetchUserInfo = async () => {
  //   try {
  //     const response = await axios.get(api.profile.getUserInfo(uid), {
  //       headers: { Authorization: localStorage.getItem('accessToken') },
  //     });

  //     setUserInfo(response.data.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // 변경
  const fetchUserInfo = async () => {
    try {
      const res = await axiosInstance.get(api.profile.getUserInfo(uid));
      setUserInfo(res.data.data);
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
