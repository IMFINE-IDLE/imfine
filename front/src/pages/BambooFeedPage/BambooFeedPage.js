import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import Tabs from '../../components/Tabs/Tabs';
import TabBar from '../../components/TabBar/TabBar';
import BambooBtnFloat from '../../components/Bamboo/BambooBtnFloat/BambooBtnFloat';
import BoxBamboo from '../../components/Bamboo/BoxBamboo/BoxBamboo';
import BoxMineBamboo from '../../components/Bamboo/BoxMineBamboo/BoxMineBamboo';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';

function BambooFeedPage() {
  const tabArr = [
    {
      idx: 0,
      tabName: '모두보기',
      tabContent: <BoxBamboo />,
    },
    {
      idx: 1,
      tabName: '나의활동',
      tabContent: <BoxMineBamboo />,
    },
  ];
  return (
    <>
      <NavBarBasic BackgroundColor={'light'} />
      <div>
        <BambooHeader
          title={'대나무숲'}
          subTitle={'어떤 말이든 써보세요.'}
          secondSubTitle={'하루가 지나면 사라질거에요.'}
        />
        <Tabs tabArr={tabArr} btnWidth={'10em'} btnHeight={'3em'} />
        <BambooBtnFloat />
        <TabBar />
      </div>
      <></>
    </>
  );
}

export default BambooFeedPage;
