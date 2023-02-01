import React from 'react';
import { Outlet } from 'react-router-dom';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

function ProfilePage() {
  return (
    <div>
      <NavBarBasic />
      <ProfileInfo
        open={false}
        followingCnt={'123'}
        followerCnt={'14523'}
        relation={1}
      />
      <Outlet />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
