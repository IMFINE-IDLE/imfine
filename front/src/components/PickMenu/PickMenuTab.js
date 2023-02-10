import React from 'react';
import useTabs from '../../hooks/useTabs';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import PickedItemList from '../PickedItemList/PickedItemList';
import PickMenu from './PickMenu';
import {
  PickMenuTabContainer,
  PickMenuTabLeft,
  PickMenuTabRight,
  TabContentContainer,
} from './style';

// (Number) tabCnt: 탭 개수, 1이면 하나만 표시
// (String) type: 탭이 1개일 때 탭에 표시할 이름
// (Array) medicals: 질병/수술 선택 결과를 담을 state, 상위 컴포넌트에서 useState로 선언
//

const PickMenuTab = ({ tabCnt, title, medicals, symptoms, idx, setType }) => {
  // 임시 더미데이터
  const sampleDataList = [
    { id: 1, name: '질병1', image: '/assets/clovers/clover0.svg' },
    { id: 2, name: '질병2', image: '/assets/clovers/clover1.svg' },
    { id: 3, name: '질병3', image: '/assets/clovers/clover2.svg' },
    { id: 4, name: '질병4', image: '/assets/clovers/clover3.svg' },
    { id: 5, name: '질병5', image: '/assets/clovers/clover4.svg' },
    { id: 6, name: '질병6', image: '/assets/clovers/clover5.svg' },
    { id: 7, name: '질병7', image: '/assets/clovers/clover6.svg' },
    { id: 8, name: '질병8', image: '/assets/clovers/clover7.svg' },
    { id: 9, name: '질병9', image: '/assets/clovers/clover8.svg' },
    { id: 10, name: '질병10', image: '/assets/clovers/clover9.svg' },
    { id: 11, name: '질병11', image: '/assets/clovers/clover-1.svg' },
    { id: 12, name: '질병12', image: '/assets/clovers/clover1.svg' },
  ];

  const tabArr =
    tabCnt === 1
      ? [
          {
            idx: 0,
            tabName: title,
            tabContent: <span>탭 하나일 때 {title}</span>,
          },
        ]
      : [
          {
            idx: 0,
            tabName: '질병/수술',
            tabContent: <PickMenu dataList={sampleDataList} />,
          },
          { idx: 1, tabName: '증상', tabContent: <span>증상</span> },
        ];

  const { currentTab, setCurrentTab } = useTabs(idx || 0, tabArr);

  return (
    <div>
      <FlexDiv direction="column" padding="0 0 2.5em 0">
        {tabCnt === 1 ? (
          <PickedItemList
            title={title}
            type={title === '증상' ? 'symptom' : 'medical'}
            medicals={medicals}
            symptoms={symptoms}
          />
        ) : (
          <>
            <PickedItemList
              title="질병/수술"
              type="medical"
              medicals={medicals}
            />
            <PickedItemList
              title="증상"
              type="symptom"
              symptoms={symptoms}
              color="light-pink"
            />
          </>
        )}
      </FlexDiv>

      <PickMenuTabContainer>
        {tabArr.map((tab, idx) => {
          if (idx === 0)
            return (
              <PickMenuTabLeft
                onClick={() => {
                  setCurrentTab(idx);
                  if (setType) setType(tab.tabName);
                }}
                key={tab.tabName}
                color={currentTab.idx === idx ? 'main' : 'light'}
                fontColor={currentTab.idx === idx ? 'white' : null}
              >
                {tab.tabName}
              </PickMenuTabLeft>
            );
          else
            return (
              <PickMenuTabRight
                onClick={() => {
                  setCurrentTab(idx);
                  if (setType) setType(tab.tabName);
                }}
                key={tab.tabName}
                color={currentTab.idx === idx ? 'main' : 'light'}
                fontColor={currentTab.idx === idx ? 'white' : null}
              >
                {tab.tabName}
              </PickMenuTabRight>
            );
        })}
      </PickMenuTabContainer>

      <TabContentContainer>{currentTab.tabContent}</TabContentContainer>
    </div>
  );
};

export default PickMenuTab;
