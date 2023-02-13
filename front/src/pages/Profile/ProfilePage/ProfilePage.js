import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../../api/api';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../../components/TabBar/TabBar';
import ProfileInfo from '../../../components/Profile/ProfileInfo/ProfileInfo';
import Tabs from '../../../components/Tabs/Tabs';
import StatusCalendar from '../../../components/StatusCalendar/StatusCalendar';
import ProfileUserDiary from '../../../components/Profile/ProfileUserDiary/ProfileUserDiary';
import ProfileSubscribeDiary from '../../../components/Profile/ProfileSubscribeDiary/ProfileSubscribeDiary';

function ProfilePage() {
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const isMine = Boolean(uid === useSelector((state) => state.user.uid));

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // userInfo 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(api.profile.getUserInfo(uid));

      await setUserInfo(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Tabs 자리에 표시할 각 탭별 렌더링 컴포넌트
  const tabArr = [
    {
      idx: 0,
      tabName: '달력',
      tabContent: <StatusCalendar uid={uid} isProfile={true} isMine={isMine} />,
    },
    {
      idx: 1,
      tabName: '일기장',
      tabContent: <ProfileUserDiary uid={uid} isMine={isMine} />,
    },
    {
      idx: 2,
      tabName: '구독중',
      tabContent: <ProfileSubscribeDiary uid={uid} />,
    },
  ];

  if (!userInfo) return null;

  return (
    <div>
      <NavBarBasic BackgroundColor="light" />
      <ProfileInfo
        isMine={isMine}
        condition={userInfo.condition}
        name={userInfo.name}
        open={userInfo.open}
        followingCount={userInfo.followingCount}
        followerCount={userInfo.followerCount}
        relation={userInfo.relation}
        uid={uid}
        fetchUserInfo={fetchUserInfo}
      />

      <Tabs tabArr={tabArr} btnWidth="6.25em"></Tabs>

      {/* <BtnFloat /> */}
      <TabBar />
    </div>
  );
}

export default ProfilePage;
