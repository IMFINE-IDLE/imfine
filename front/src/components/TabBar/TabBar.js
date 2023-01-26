import React, { useState } from 'react';
import CloverModal from './CloverModal';
import {
  TabContainer,
  Tab,
  TabCenter,
  TabImg,
  Clover,
  CloverStatusContainer,
} from './style';

const TabBar = () => {
  const [currentTabIdx, setCurrentTabIdx] = useState(0);
  const [currentClover, setCurrentClover] = useState('main');
  const [cloversOpen, setCloversOpen] = useState(false);

  const handleTabClick = (e) => {
    const tab = e.target.closest('div');
    const tabs = [...tab.parentElement.children];
    const curIdx = tabs.indexOf(tab);

    setCurrentTabIdx(tabs.indexOf(curIdx));

    console.log('tab', tab);
    console.log('tabs', tabs);
    console.log('curIdx', curIdx);

    tabs.forEach((tab, idx) => {
      tab.className = idx === curIdx ? 'focused' : '';
    });

    // 라우터링크 추가할 곳
  };

  return (
    <div>
      {cloversOpen && (
        <CloverStatusContainer width="18.75em" height="11em" radius="25px">
          <CloverModal setCurrentClover={setCurrentClover} />
        </CloverStatusContainer>
      )}

      <TabContainer>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
        <TabCenter>
          <Clover
            onClick={() => setCloversOpen((prev) => !prev)}
            src={`/assets/clovers/clover-${currentClover}.svg`}
            width="6.25em"
            height="6.25em"
            isMain={true}
          />
        </TabCenter>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default TabBar;
