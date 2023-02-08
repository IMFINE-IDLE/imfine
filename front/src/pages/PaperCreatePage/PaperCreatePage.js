import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxPaperDetail, BoxContent } from './style';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
import DiariesDropdown from '../../components/Paper/DiariesDropdown/DiariesDropdown';
import DateDropdown from '../../components/Paper/DateDropdown/DateDropdown';
import SymptomRating from '../../components/Paper/SymptomRating/SymptomRating';
function PaperCreatePage() {
  const now = new Date();
  const [diaries, setDiaries] = useState([]);
  const [diaryTitle, setDiaryTitle] = useState('');
  const [form, setForm] = useState({
    year: now.getFullYear(),
    month: '01',
    day: '01',
  });

  console.log('dddd', form.day);
  console.log('mmmm', form.month);
  console.log('yyyy', form.year);
  const getDiaries = async () => {
    try {
      const res = await axios.get(api.diary.getDiaries(), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setDiaries(res.data.data);
      console.log('다이어리테스트', res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };
  useEffect(() => {
    getDiaries();
    console.log('diaries', diaries);
  }, []);

  console.log('diaryid', diaryTitle);
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
        <DiariesDropdown
          value={diaryTitle}
          state={setDiaryTitle}
          diaries={diaries}
        />
        <DateDropdown value={form} state={setForm} />
      </BoxPaperDetail>
      <BoxContent>
        <SymptomRating />
      </BoxContent>
    </>
  );
}

export default PaperCreatePage;
