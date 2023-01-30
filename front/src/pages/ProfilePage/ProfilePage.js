import React from 'react';
// import { Outlet } from 'react-router-dom';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';
// import NavBarBasic from '../../components/common/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';

function ProfilePage() {
  return (
    <div>
      {/* <NavBarBasic /> */}
      Profile
      {/* <Outlet /> */}
      <StatusCalendar />
      <BtnFloat />
      <TabBar />
    </div>
  );
}

export default ProfilePage;
