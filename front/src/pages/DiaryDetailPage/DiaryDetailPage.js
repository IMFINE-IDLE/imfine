import React from 'react';
import { useParams } from 'react-router-dom';

const DiaryDetailPage = () => {
  const { diaryId } = useParams();
  return <>{('diaryId', diaryId)}</>;
};

export default DiaryDetailPage;
