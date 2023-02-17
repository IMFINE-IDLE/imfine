import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingImg from '../../components/OnboardingImg/OnboardingImg';
import { BoxOnboarding, BtnNext } from './style';

function OnboardingPage() {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  return (
    <BoxOnboarding radius={'0 0 0 0'} width={'100vw'} height={'100vh'}>
      <OnboardingImg stage={stage} />
      <BtnNext
        onClick={() => {
          if (stage < 3) {
            setStage((prev) => prev + 1);
          } else {
            navigate('/home');
          }
        }}
      >
        {stage > 2 ? 'IMFINE과 건강해지러 가기' : '다음'}
      </BtnNext>
    </BoxOnboarding>
  );
}

export default OnboardingPage;
