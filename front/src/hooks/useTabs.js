import { useState } from 'react';

// 사용법
// 1. 탭 목록이 들어있는 배열을 정의한다.
// 예시
// const tabArr = [
//     { tabName: '달력', tabContent: <StatusCalendar /> },
//     { tabName: '일기장', tabContent: <Diary /> },
//     { tabName: '구독중', tabContent: <Subscribe /> },
//   ];

// 2. 하기와 같이 현재 탭과 선택함수를 정의한다.
// const {currentTab, setCurrentTab} = useTabs(0, tabArr);

// 3. return JSX 내부에서 정의한 탭 목록을 map으로 돌면서 onClick에 setCurrentTab을 부여한다.
// 예시
// {tabArr.map((tab, idx) => (
//   <button onClick={() => setCurrentTab(idx)}>{tab.tabName}</button>
// ))}

// 4. return JSX 내부에서 현재 탭 컨텐츠를 보여준다.
// {currentTab.tabContent}

const useTabs = (initialTabIdx, allTabList) => {
  const [contentIdx, setContentIdx] = useState(initialTabIdx);
  return {
    currentTab: allTabList[contentIdx],
    setCurrentTab: setContentIdx,
  };
};

export default useTabs;
