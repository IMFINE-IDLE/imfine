import React from 'react';
import useTabs from '../../hooks/useTabs';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import {
  PickMenuTabContainer,
  PickMenuTabLeft,
  PickMenuTabRight,
  TabContentContainer,
} from './style';

// (Number) tabCnt: 탭 개수 1 또는 2
// (String) type: 1개일 때 탭에 표시할 이름

const PickMenuTab = ({ tabCnt, type, idx, setType }) => {
  const tabArr =
    tabCnt === 1
      ? [
          {
            idx: 0,
            tabName: type,
            tabContent: <span>탭 하나일 때 {type}</span>,
          },
        ]
      : [
          { idx: 0, tabName: '질병/수술', tabContent: <span> 질병/수술</span> },
          { idx: 1, tabName: '증상', tabContent: <span>증상</span> },
        ];

  const { currentTab, setCurrentTab } = useTabs(idx || 0, tabArr);

  return (
    <div>
      {/* <TabContainer> */}
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
      {/* </TabContainer> */}
    </div>
  );
};

export default PickMenuTab;
