import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../api/api';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ type, medicalIds, symptomIds }) => {
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
          tab: `${type}`,
          'medical-id': `${medicalIds || ''}`,
          'symptom-id': `${symptomIds || ''}`,
          page: 0,
          size: 12,
        },
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      setDiaryList(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDiaryList();
  }, [type]);

  return (
    <FlexDiv wrap="wrap" gap="1.25em 5%" justify="space-between">
      {diaryList?.map((diary) => {
        const {
          diaryId,
          image,
          medicalName,
          name,
          paperCount,
          subscribeCount,
          title,
        } = diary;
        return (
          <DiaryItem
            key={diaryId}
            diaryId={diaryId}
            image={image}
            medicalName={medicalName}
            name={name}
            paperCount={paperCount}
            subscribeCount={subscribeCount}
            title={title}
          />
        );
      })}
    </FlexDiv>
  );
};

export default DiaryListGrid;
