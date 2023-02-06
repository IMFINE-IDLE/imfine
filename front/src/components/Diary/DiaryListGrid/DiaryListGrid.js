import axios from 'axios';
import React from 'react';
import api from '../../../api/api';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ type }) => {
  // 서버에 요청시
  // medicalId, symptomId는 String으로 숫자 , 로 구분해서 보내기
  // tab은 디폴트가 최신순, poplular 작성시 인기순
  // page는 페이지
  // size는 한 페이지에 담길 일기장 수

  // const fetchDiaryList = async () => {
  //   try {
  //     axios.get(api.diary.getDiaryList());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <FlexDiv direction="column">
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
        <DiaryItem />
      </FlexDiv>
    </>
  );
};

export default DiaryListGrid;
