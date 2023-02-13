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

function SignUpSettingPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

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
    <BoxGrad radius={'0 0 0 0'}>
      <div>
        <Title>계정 기본 설정</Title>
      </div>
      <BoxTopArea>
        <ToggleAccountOpen isOpen={isOpen} setIsOpen={setIsOpen} />
        <BoxSymptom>
          <TitleSmall>관심있는 질병 혹은 수술을 선택해주세요.</TitleSmall>
        </BoxSymptom>
      </BoxTopArea>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <BtnSignup
          type="button"
          onClick={() => {
            setInitialProfile();
            navigate('/home');
          }}
        >
          건강해지러 가기!
        </BtnSignup>
      </div>
    </BoxGrad>
  );
}

export default SignUpSettingPage;
