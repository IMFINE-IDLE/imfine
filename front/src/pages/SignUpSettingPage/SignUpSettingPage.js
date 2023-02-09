import React from 'react';
import { useNavigate } from 'react-router-dom';
import PickSymptom from '../../components/PickSymptom/PickSymptom';
import { BtnSignup } from '../SignUpPage/style';

function SignUpSettingPage() {
  const navigate = useNavigate();

  return (
    <>
      <PickSymptom showMedical showSymptom />
      <div style={{ width: '80%', margin: '0 auto' }}>
        <BtnSignup type="button" onClick={() => navigate('/home')}>
          건강해지러 가기!
        </BtnSignup>
      </div>
    </>
  );
}

export default SignUpSettingPage;
