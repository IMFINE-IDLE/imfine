import React from 'react';
import { Outlet } from 'react-router-dom';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import TabBar from '../../components/TabBar/TabBar';

function Profile() {
  return (
    <div>
      Profile
      <Outlet />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default Profile;
