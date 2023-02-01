import React from 'react';
import BambooHeader from '../../components/Bamboo/BambooHeader/BambooHeader';
import Tabs from '../../components/Tabs/Tabs';
import TabBar from '../../components/TabBar/TabBar';
import BambooBtnFloat from '../../components/Bamboo/BambooBtnFloat/BambooBtnFloat';
import BoxBamboo from '../../components/Bamboo/BoxBamboo/BoxBamboo';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';

function BambooFeedPage() {
  const res = {
    success: true,
    status: 200,
    message: '요청에 성공하였습니다.',
    data: [
      {
        bambooId: 1,
        content: 'aaa',
      },
      {
        bambooId: 2,
        content: 'bbb',
      },
    ],
  };
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
    { idx: 0, tabName: '모두보기', tabContent: <BoxBamboo res={res} /> },
    { idx: 1, tabName: '나의활동', tabContent: <BoxBamboo res={myRes} /> },
  ];
  return (
    <>
      <NavBarBasic />
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
