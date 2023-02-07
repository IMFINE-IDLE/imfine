import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ diaryList, setType }) => {
  const navigate = useNavigate();

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
            onClick={() => navigate(`/diary/${diaryId}`)}
          />
        );
      })}
    </FlexDiv>
  );
};

export default DiaryListGrid;
