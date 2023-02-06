import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
function PaperCreate() {
  const items = ['aaaa', 'bbbb', 'cccc'];
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState(items[0]);
  const [diaries, setDiaries] = useState([]);

  const getDiaries = async () => {
    try {
      const res = await axios.get(api.diary.getDiaries(), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('diaries', res.data);
      setDiaries(diaries);
    } catch (res) {
      console.log('err', res.data);
    }
  };
  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <div>
      <PaperCreateHeader items={diaries} />
    </div>
  );
}

export default PaperCreate;
