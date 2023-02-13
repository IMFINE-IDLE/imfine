import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import PickSymptom from '../../components/PickSymptom/PickSymptom';
import ToggleAccountOpen from '../../components/ToggleAccountOpen/ToggleAccountOpen';
import { BtnSignup } from '../SignUpPage/style';
import { BoxSymptom, BoxTopArea, Title, TitleSmall } from './style';
import api from '../../api/api';
import PickMenuTab from '../../components/PickMenu/PickMenuTab';

function SignUpSettingPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [medicalList, setMedicalList] = useState([]);

  const setInitialProfile = async () => {
    const data = {
      open: isOpen,
      medicalList: [],
    };
    try {
      const res = await axios.put(api.user.setInitialProfile(), data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Title>계정 기본 설정</Title>
      </div>
      <BoxTopArea>
        <div style={{ padding: '0 2em' }}>
          <ToggleAccountOpen isOpen={isOpen} setIsOpen={setIsOpen} />
          <TitleSmall>관심있는 질병 혹은 수술을 선택해주세요.</TitleSmall>
        </div>
        <BoxSymptom>
          <PickMenuTab
            tabCnt={1}
            title={'질병/수술'}
            paddingPicked={'0 2em'}
            medicals={medicalList}
            setMedicals={setMedicalList}
            onSubmitBtnClick={() => {
              setInitialProfile();
              navigate('/home');
            }}
            submitBtnText={'건강해지러 가기!'}
          />
        </BoxSymptom>
      </BoxTopArea>
    </>
  );
}

export default SignUpSettingPage;
