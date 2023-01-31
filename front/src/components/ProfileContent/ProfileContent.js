import React from 'react';

import useTabs from '../../hooks/useTabs';
import StatusCalendar from '../StatusCalendar/StatusCalendar';
import { ProfileContentContainer, ProfileContentTabBtn } from './style';

const ProfileContent = () => {
  const tabArr = [
    { tabName: '달력', tabContent: <StatusCalendar /> },
    { tabName: '일기장', tabContent: <span>일기장</span> },
    { tabName: '구독중', tabContent: <span>구독중</span> },
  ];
  const { currentTab, setCurrentTab } = useTabs(0, tabArr);

  return (
    <div>
      <ProfileContentContainer>
        <div style={{ display: 'flex' }}>
          {tabArr.map((tab, idx) => (
            <ProfileContentTabBtn
              onClick={() => setCurrentTab(idx)}
              key={tab.tabName}
            >
              {tab.tabName}
            </ProfileContentTabBtn>
          ))}
        </div>
        ProfileContent
        {currentTab.tabContent}
      </ProfileContentContainer>
    </div>
  );
};
export default ProfileContent;
