import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxPaperDetail } from './style';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
import DiariesDropdown from '../../components/Paper/DiariesDropdown/DiariesDropdown';
import DateDropdown from '../../components/Paper/DateDropdown/DateDropdown';

function PaperCreatePage() {
  const items = ['aaaa', 'bbbb', 'cccc'];
  const [diaries, setDiaries] = useState([]);
  const [diaryTitle, setDiaryTitle] = useState('');
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState([]);

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
        <DateDropdown />
      </BoxPaperDetail>
    </>
  );
}

export default PaperCreatePage;
