import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickMenuTab from '../../../components/PickMenu/PickMenuTab';
import { SubmitBtn } from '../DiaryCreateConfirmPage/style';

const DiaryCreatePage = () => {
  const navigate = useNavigate();
  const [medicalList, setMedicalList] = useState(null);
  const [symptomList, setSymptomList] = useState(null);

  const handleSubmit = () => {
    navigate('/diary/create/confirm');
  };

  console.log('medicals picked test', medicalList);

  return (
    <>
      <NavBarBasic Back={true} Text="일기장 생성" />

      <PickMenuTab
        tabCnt={2}
        title="질병/수술"
        medicals={medicalList}
        symptoms={symptomList}
        setMedicals={setMedicalList}
        setSymptoms={setSymptomList}
        onSubmitBtnClick={handleSubmit}
        submitBtnText="선택 완료"
      />

      {/* <SubmitBtn
        radius="20px"
        height="3.5em"
        margin="4em 0 0 0"
        type="submit"
        onClick={() => navigate('/diary/create/confirm')}
      >
        선택 완료
      </SubmitBtn> */}
    </>
  );
};

export default DiaryCreatePage;
