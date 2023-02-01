import React from 'react';
import BambooHeader from '../../components/BambooHeader/BambooHeader';
import Tabs from '../../components/Tabs/Tabs';

function BambooFeedPage() {
  const tabArr = [
    { idx: 0, tabName: '모두보기', tabContent: <div></div> },
    { idx: 1, tabName: '나의활동', tabContent: <div></div> },
  ];
  return (
    <div>
      <BambooHeader
        title={'대나무메인'}
        subTitle={'대나무메인페이지입니다.'}
        secondSubTitle={'둘째줄 설명도이어서 작성하긔'}
      />
      <Tabs tabArr={tabArr} btnWidth={'10em'} btnHeight={'3em'} />
    </div>
  );
}

export default BambooFeedPage;
