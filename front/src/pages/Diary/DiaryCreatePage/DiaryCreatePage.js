import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickMenuTab from '../../../components/PickMenu/PickMenuTab';
import { SubmitBtn } from '../DiaryCreateConfirmPage/style';

const DiaryCreatePage = () => {
  const navigate = useNavigate();
  const [medicalList, setMedicalList] = useState(null);
  const [symptomList, setSymptomList] = useState(null);

  return (
    <>
      <NavBarBasic Back={true} Text="일기장 생성" />

      {/* <FlexDiv direction="column" padding="0 0 2.5em 0">
        <PickedItemList
          title="질병/수술"
          type="medical"
          medicals={medicalList}
        />
        <PickedItemList
          title="증상"
          type="symptom"
          symptoms={symptomList}
          color="light-pink"
        />
      </FlexDiv> */}

      <PickMenuTab
        tabCnt={2}
        title="질병/수술"
        medicals={medicalList}
        symptoms={symptomList}
      />

      <SubmitBtn
        radius="20px"
        height="3.5em"
        margin="4em 0 0 0"
        type="submit"
        onClick={() => navigate('/diary/create/confirm')}
      >
        선택 완료
      </SubmitBtn>
    </>
  );
};

export default DiaryCreatePage;
