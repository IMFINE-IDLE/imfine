import React from 'react';
import useTabs from '../../hooks/useTabs';
import {
  TabContainer,
  TabBtn,
  TabBtnContainer,
  TabContentContainer,
} from './style';

// tabArr는 객체를 담은 배열. 하기 예시

// key값 바꾸지 말 것

// tabName은 탭 버튼 내부에 들어갈 문구
// tabContent는 렌더링할 컴포넌트

// const tabArr = [
//   { idx: 0, tabName: '달력', tabContent: <StatusCalendar /> },
//   { idx: 1, tabName: '일기장', tabContent: <Diary /> },
//   { idx: 2, tabName: '구독중', tabContent: <Subscribe /> },
// ];

// btnWidth, btnHeight는 탭버튼 너비와 높이. em으로 지정할 것

const Tabs = ({ tabArr, btnWidth, btnHeight }) => {
  const { currentTab, setCurrentTab } = useTabs(0, tabArr);

  return (
    <div>
      <TabContainer>
        <TabBtnContainer>
          {tabArr.map((tab, idx) => (
            <TabBtn
              onClick={() => setCurrentTab(idx)}
              key={tab.tabName}
              color={currentTab.idx === idx ? 'main' : 'gray'}
              width={btnWidth}
              height={btnHeight}
            >
              {tab.tabName}
            </TabBtn>
          ))}
        </TabBtnContainer>

        <TabContentContainer>{currentTab.tabContent}</TabContentContainer>
      </TabContainer>
    </div>
  );
};

export default Tabs;
