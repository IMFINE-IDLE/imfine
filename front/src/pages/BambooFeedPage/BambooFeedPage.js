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
  const [searchFilter, setSearchFilter] = useState('latest');

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

  useEffect(() => {
    fetchBambooFeed();
  }, []);

  const myRes = {
    success: true,
    status: 200,
    message: '요청에 성공하였습니다.',
    data: [
      {
        bambooId: 3,
        content: 'c',
      },
      {
        bambooId: 4,
        content: 'ddd',
      },
    ],
  };
  const tabArr = [
    {
      idx: 0,
      tabName: '모두보기',
      tabContent: <BoxBamboo res={responseAll} />,
    },
    { idx: 1, tabName: '나의활동', tabContent: <BoxBamboo res={myRes} /> },
  ];
  return (
    <>
      <NavBarBasic BackgroundColor={'light'} />
      <div>
        <BambooHeader
          title={'대나무메인'}
          subTitle={'대나무메인페이지입니다.'}
          secondSubTitle={'둘째줄 설명도이어서 작성하긔'}
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
