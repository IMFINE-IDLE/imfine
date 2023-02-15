import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickMenuTab from '../../../components/PickMenu/PickMenuTab';

const ProfileMedicals = () => {
  console.log(useLocation().state);
  const { uid, newName, medicals, isOpen } = useLocation().state;
  const [pickedMedicals, setPickedMedicals] = useState(medicals);

  const navigate = useNavigate();

  // 관심 질병/수술 선택 완료시 선택된 리스트를 가지고 ProfileConfigPage로 돌아감
  const handleSubmitBtnClick = () => {
    const infoToProfileConfig = {
      name: newName,
      medicalList: pickedMedicals,
      open: isOpen,
      medicalsOpen: true,
    };
    navigate(`/profile/${uid}/config`, { state: infoToProfileConfig });
  };

  return (
    <>
      <NavBarBasic Back={true} Text={'관심 질병/수술 설정'} />
      <PickMenuTab
        tabCnt={1}
        title="질병/수술"
        medicals={pickedMedicals}
        setMedicals={setPickedMedicals}
        onSubmitBtnClick={handleSubmitBtnClick}
        submitBtnText="선택 완료"
      />
    </>
  );
};

export default ProfileMedicals;
