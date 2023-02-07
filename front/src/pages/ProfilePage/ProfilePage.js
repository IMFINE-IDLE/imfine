import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

function ProfilePage() {
  //////////// Hooks //////////////
  const [userInfo, setUserInfo] = useState(null);
  const { uid } = useParams();

  //////////// Functions //////////////
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(api.profile.getUserInfo(uid), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      // response.data 안에 들어있는 data를 userInfo 에 저장
      setUserInfo(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  //////////// Views //////////////
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
      <Outlet context={{ uid }} />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
