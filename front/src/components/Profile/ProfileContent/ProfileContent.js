import React from 'react';

import Tabs from '../../Tabs/Tabs';
import StatusCalendar from '../../StatusCalendar/StatusCalendar';

const ProfileContent = () => {
  const tabArr = [
    { idx: 0, tabName: '달력', tabContent: <StatusCalendar /> },
    { idx: 1, tabName: '일기장', tabContent: <span>일기장</span> },
    { idx: 2, tabName: '구독중', tabContent: <span>구독중</span> },
  ];

  return (
    <div>
      <Tabs tabArr={tabArr} btnWidth="6.25em"></Tabs>
    </div>
  );
};
export default ProfileContent;
