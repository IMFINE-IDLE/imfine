import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import Tabs from '../../components/Tabs/Tabs';
import TabBar from '../../components/TabBar/TabBar';
import BambooBtnFloat from '../../components/Bamboo/BambooBtnFloat/BambooBtnFloat';
import BoxBamboo from '../../components/Bamboo/BoxBamboo/BoxBamboo';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';

function BambooFeedPage() {
  const [responseAll, setResponseAll] = useState({});
  const [myresponseAll, setMyResponseAll] = useState({});
  const [searchFilter, setSearchFilter] = useState('latest');
  const [mySearchFilter, setMySearchFilter] = useState('write');
  // 필터링 타입 props로 설정 필요...
  const fetchBambooFeed = async () => {
    try {
      const res = await axios.get(api.bamboo.getBambooFeed(searchFilter), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('response확인', res.data);
      setResponseAll(res.data);
    } catch (err) {
      console.log('err occured', err);
    }
  };

  // 내가 쓴 대나무 관련 글들 get
  const fetchMyBambooFeed = async () => {
    try {
      const res = await axios.get(api.bamboo.getMyBambooFeed(mySearchFilter), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('response확인', res.data);
      setMyResponseAll(res.data);
    } catch (err) {
      console.log('err occured', err);
    }
  };

  useEffect(() => {
    fetchBambooFeed();
    fetchMyBambooFeed();
  }, []);

  const tabArr = [
    {
      idx: 0,
      tabName: '모두보기',
      tabContent: <BoxBamboo res={responseAll} />,
    },
    {
      idx: 1,
      tabName: '나의활동',
      tabContent: <BoxBamboo res={myresponseAll} />,
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
