import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../api/api';
import BtnFloat from '../../../components/BtnFloat/BtnFloat';
import DiaryInfo from '../../../components/Diary/DiaryInfo/DiaryInfo';
import DiaryListGrid from '../../../components/Diary/DiaryListGrid/DiaryListGrid';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import TabBar from '../../../components/TabBar/TabBar';
import Tabs from '../../../components/Tabs/Tabs';

const DiaryFeedPage = () => {
  const { state } = useLocation();

  // 필터 적용 관련 states
  const filtered = state.filter ? true : false; // 필터 적용 여부 확인
  // 필터 적용 여부에 따른 질병/수술, 증상 목록 세팅
  const medicals = state.filter ? state.pickedMedicals : [];
  const symptoms = state.filter ? state.pickedSymptoms : [];

  // 일기장 목록 가져올 때 이용할 states
  const [type, setType] = useState('최신'); // '최신' 또는 '인기'
  const [diaryList, setDiaryList] = useState([]);

  // 일기장 목록 가져오기
  const fetchDiaryList = async () => {
    // 서버에 요청시
    // medicalId, symptomId는 String으로 숫자 콤마(,) 로 구분해서 보내기
    // tab은 디폴트가 최신순, poplular 작성시 인기순
    // page는 페이지
    // size는 한 페이지에 담길 일기장 수
    try {
      const res = await axios.get(api.diary.getDiaryList(), {
        params: {
          tab: `${type === '인기' ? 'popular' : 'latest'}`,
          'medical-id': `${medicals.map((el) => el.id).join(',') || ''}`,
          'symptom-id': `${symptoms.map((el) => el.id).join(',') || ''}`,
          page: 0,
          size: 12,
        },
      });

      console.log('idaryList', res.data.data);
      await setDiaryList(res.data.data);
      // console.log(11111111111, type);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDiaryList();
  }, [type]);

  // props: type, medicalIds, symptomIds
  const tabArr = [
    {
      idx: 0,
      tabName: '최신',
      tabContent: <DiaryListGrid diaryList={diaryList} />,
    },
    {
      idx: 1,
      tabName: '인기',
      tabContent: <DiaryListGrid diaryList={diaryList} />,
    },
  ];

  // setFiltered(true);

  return (
    <>
      <NavBarBasic BackgroundColor={'light'} />
      <DiaryInfo filtered={filtered} medicals={medicals} symptoms={symptoms} />

      <Tabs tabArr={tabArr} setType={setType}></Tabs>
      <BtnFloat />
      <TabBar />
    </>
  );
};

export default DiaryFeedPage;
