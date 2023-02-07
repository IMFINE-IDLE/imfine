import React, { useState } from 'react';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import DiaryInfo from '../../components/Diary/DiaryInfo/DiaryInfo';
import DiaryListGrid from '../../components/Diary/DiaryListGrid/DiaryListGrid';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../components/TabBar/TabBar';
import Tabs from '../../components/Tabs/Tabs';

const DiaryFeedPage = () => {
  const [filtered, setFiltered] = useState(false);

  // // 일기장 목록 가져오기
  // const fetchDiaryList = async () => {
  //   // 서버에 요청시
  //   // medicalId, symptomId는 String으로 숫자 콤마(,) 로 구분해서 보내기
  //   // tab은 디폴트가 최신순, poplular 작성시 인기순
  //   // page는 페이지
  //   // size는 한 페이지에 담길 일기장 수
  //   try {
  //     const res = await axios.get(api.diary.getDiaryList(), {
  //       params: {
  //         tab: `${type}`,
  //         'medical-id': `${medicalIds || ''}`,
  //         'symptom-id': `${symptomIds || ''}`,
  //         page: 0,
  //         size: 12,
  //       },
  //       headers: { Authorization: localStorage.getItem('accessToken') },
  //     });

  //     setDiaryList(res.data.data);
  //     console.log(res.data.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // props: type, medicalIds, symptomIds
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
