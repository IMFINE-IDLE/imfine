import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickMenuTab from '../../../components/PickMenu/PickMenuTab';

const DiaryFilterPage = () => {
  const { medicals, symptoms } = useLocation().state;
  const [pickedMedicals, setPickedMedicals] = useState(medicals);
  const [pickedSymptoms, setPickedSymptoms] = useState(symptoms);

  const navigate = useNavigate();

  // 필터 선택 완료시 선택된 질병/수술, 증상 리스트를 가지고 DiaryFeedPage로 돌아감
  const handleSubmitBtnClick = () => {
    const infoToDiaryFeed = { pickedMedicals, pickedSymptoms, filter: true };
    navigate('/diary', { state: infoToDiaryFeed });
  };

  return (
    <>
      <NavBarBasic Back={true} Text={'필터 선택'} />
      <PickMenuTab
        tabCnt={2}
        medicals={pickedMedicals}
        symptoms={pickedSymptoms}
        setMedicals={setPickedMedicals}
        setSymptoms={setPickedSymptoms}
        onSubmitBtnClick={handleSubmitBtnClick}
        submitBtnText="선택 완료"
      />
    </>
  );
};

export default DiaryFilterPage;
