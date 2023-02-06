import React, { useState } from 'react';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import DiaryInfo from '../../components/Diary/DiaryInfo/DiaryInfo';
import DiaryListGrid from '../../components/Diary/DiaryListGrid/DiaryListGrid';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import Tabs from '../../components/Tabs/Tabs';

const DiaryFeedPage = () => {
  const [filtered, setFiltered] = useState(false);

  const tabArr = [
    { idx: 0, tabName: '최신', tabContent: <DiaryListGrid type="latest" /> },
    { idx: 1, tabName: '인기', tabContent: <DiaryListGrid type="popular" /> },
  ];

  // setFiltered(true);

  return (
    <>
      <NavBarBasic />
      <DiaryInfo filtered={filtered} />

      <Tabs tabArr={tabArr}></Tabs>
      <BtnFloat />
      <TabBar />
    </>
  );
};

export default DiaryFeedPage;
