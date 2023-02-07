import React from 'react';
import useTabs from '../../hooks/useTabs';
import {
  TabContainer,
  TabBtn,
  TabBtnContainer,
  TabContentContainer,
} from './style';

//////// props 설명 ////////
// tabArr는 객체를 담은 배열. 내부 객체의 key값 바꾸지 말고 그대로 쓰기
// idx는 초기에 선택할 탭의 인덱스. 디폴트는 0(가장 앞의 탭)
// setType 함수를 프롭스로 넘겨주면 탭을 클릭할 때 해당 탭의 tabName으로 type state를 변경시킴
// btnWidth, btnHeight는 탭버튼 너비와 높이. em으로 지정할 것

//////// tabArr 내부 key 설명 ////////
// tabName은 탭 버튼 내부에 들어갈 문구
// tabContent는 렌더링할 컴포넌트

//////// 예시 /////////////
// const tabArr = [
//   { idx: 0, tabName: '달력', tabContent: <StatusCalendar /> },
//   { idx: 1, tabName: '일기장', tabContent: <Diary /> },
//   { idx: 2, tabName: '구독중', tabContent: <Subscribe /> },
// ];

const Tabs = ({ tabArr, idx, setType, btnWidth, btnHeight }) => {
  const { currentTab, setCurrentTab } = useTabs(idx || 0, tabArr);

  return (
    <div>
      <TabContainer>
        <TabBtnContainer>
          {tabArr.map((tab, idx) => (
            <TabBtn
              onClick={() => {
                setCurrentTab(idx);
                setType(tab.tabName);
              }}
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
