import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import {
  BoxPaperDetail,
  BoxContent,
  TopDiv,
  ContentLabel,
  RightDiv,
} from './style';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
import DiariesDropdown from '../../components/Paper/DiariesDropdown/DiariesDropdown';
import DateDropdown from '../../components/Paper/DateDropdown/DateDropdown';
import SymptomRating from '../../components/Paper/SymptomRating/SymptomRating';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

function PaperCreatePage() {
  const navigate = useNavigate();
  // 이미지 업로드 개수 3개까지 MAX
  const now = new Date();
  const [diaries, setDiaries] = useState([]); // dropdown에 나올 일기장 선택값들 저장
  const [diaryId, setDiaryId] = useState(''); // dropdown 선택 시 일기장 아이디값 저장
  const [diary, setDiary] = useState(''); // 일기장 상세정보
  const [form, setForm] = useState({
    year: now.getFullYear(),
    month: '01',
    day: '01',
  });

  console.log('dddd', form.day);
  console.log('mmmm', form.month);
  console.log('yyyy', form.year);

  // 사용자가 작성한 다이어리 정보 받아오기
  const getDiaries = async () => {
    try {
      const res = await axios.get(api.diary.getDiaries(), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setDiaries(res.data.data);
      console.log('내가만든다이어리', res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };
  useEffect(() => {
    getDiaries();
  }, [diaryId]);

  console.log('selected diaryid', diaryId);

  // 해당 다이어리의 정보 불러오기
  const getDiaryInfos = async () => {
    try {
      const res = await axios.get(api.diary.getDiaryInfo(diaryId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('일기장 상세정보', res.data.data);
      setDiary(res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };

  useEffect(() => {
    if (diaryId != '') {
      getDiaryInfos();
    }
  }, [diaryId]);

  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      <BoxPaperDetail>
        <PaperCreateHeader />
        <DiariesDropdown value={diaryId} state={setDiaryId} diaries={diaries} />
        <DateDropdown value={form} state={setForm} />
      </BoxPaperDetail>
      <TopDiv>
        <ContentLabel>증상을 체크해주세요.</ContentLabel>
      </TopDiv>
      <BoxContent>
        <SymptomRating />
      </BoxContent>
      <RightDiv>
        <FiArrowRight />
        <ContentLabel
          margin="1em 2em 1em 0.3em"
          onClick={() => navigate('/paper/symptom')}
        >
          {' '}
          증상 추가하러 가기
        </ContentLabel>
      </RightDiv>
    </>
  );
}

export default PaperCreatePage;
