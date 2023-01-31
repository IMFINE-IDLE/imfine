import React from 'react';
import { Outlet } from 'react-router-dom';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';

function ProfilePage() {
  return (
    <div>
      <NavBarBasic />
      <ProfileInfo />
      <Outlet />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
