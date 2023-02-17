import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickMenuTab from '../../../components/PickMenu/PickMenuTab';

const DiaryAddSymptomPage = () => {
  const { diaryId, medicals, symptoms, title, description, open, from } =
    useLocation().state;
  // 추가해준 from으로 이전페이지가 어디었는지 다르게 처리를 해줄거에요
  const [pickedMedicals, setPickedMedicals] = useState(medicals);
  const [pickedSymptoms, setPickedSymptoms] = useState(symptoms);

  const navigate = useNavigate();

  // 증상 추가 선택 완료시 추가된 증상 api 요청을 보내고,
  // 완료된 증상 리스트를 가지고 DiaryModifyPage로 돌아감
  const handleSubmitBtnClick = async () => {
    try {
      const newSymptoms = pickedSymptoms.filter((pickedSymptom) => {
        return !symptoms.some((symptom) => symptom.id === pickedSymptom.id);
      });

      for (const newSymptom of newSymptoms) {
        await axios.post(api.diary.postNewDiarySymptom(), {
          diaryId: diaryId,
          symptomId: newSymptom.id,
        });
      }

      const infoToDiaryModify = {
        title,
        description,
        medicals,
        diaryHasSymptoms: pickedSymptoms,
        open,
      };

      // 이전페이지가 어디었느냐(from)에 따라 navigate 다르게 처리
      if (from === 'diary') {
        // navigate(`/diary/${diaryId}/modify`, {
        navigate(-1, {
          state: infoToDiaryModify,
          replace: true,
        });
      }
      // 이전페이지가 paper(일기쓰기.일기수정페이지)였다면 그냥 이전페이지로 보내버리기
      if (from === 'paper') {
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBarBasic Back={true} />
      <PickMenuTab
        tabCnt={1}
        title="증상"
        medicals={pickedMedicals}
        symptoms={pickedSymptoms}
        setMedicals={setPickedMedicals}
        setSymptoms={setPickedSymptoms}
        onSubmitBtnClick={handleSubmitBtnClick}
        submitBtnText={'선택 완료'}
        addOnly={true}
      />
    </>
  );
};

export default DiaryAddSymptomPage;
