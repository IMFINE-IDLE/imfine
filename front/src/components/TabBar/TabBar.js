import React, { useState } from 'react';
import { BoxNoShad } from '../BoxNoShad/BoxNoShad';
import { TabContainer, Tab, TabCenter, TabImg, Clover } from './style';

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

  const changeCloverStatus = () => {};

  return (
    <div>
      {cloversOpen && (
        <BoxNoShad width="300px" height="200px" className="colver-popup__box">
          <Clover onClick={changeCloverStatus} />
        </BoxNoShad>
      )}

      <TabContainer>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
        <Tab>
          <TabImg onClick={handleTabClick} src="/assets/icons/home.svg" />
        </Tab>
        <TabCenter>
          <TabImg
            onClick={() => setCloverOpen(!cloverOpen)}
            src={`/assets/clovers/clover-${currentClover}.svg`}
            width="1.5em"
            height="1.5em"
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
