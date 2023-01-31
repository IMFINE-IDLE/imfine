import React, { useState } from 'react';

import StatusCalendar from '../StatusCalendar/StatusCalendar';
import { ProfileContentContainer, ProfileContentTabBtn } from './style';

const ProfileContent = () => {
  const useTabs = (initialTabIdx, allTabList) => {
    const [contentIdx, setContentIdx] = useState(initialTabIdx);
    return {
      currentTab: allTabList[contentIdx],
      setCurrentTab: setContentIdx,
    };
  };

  const tabArr = [
    { tabName: '달력', tabContent: <StatusCalendar /> },
    { tabName: '일기장', tabContent: <span>일기장</span> },
    { tabName: '구독중', tabContent: <span>구독중</span> },
  ];
  const { currentTab, setCurrentTab } = useTabs(0, tabArr);

  console.log('cur', currentTab);

  return (
    <div>
      <ProfileContentContainer>
        <div style={{ display: 'flex' }}>
          {tabArr.map((section, idx) => (
            <ProfileContentTabBtn onClick={() => setCurrentTab(idx)}>
              {section.tabName}
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
