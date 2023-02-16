import React from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';

function OnboardingImg({ stage }) {
  return (
    <img
      src={`/assets/images/onboarding-${stage}.png`}
      alt={`온보딩${stage}`}
      width={'70%'}
    />
  );
}

export default OnboardingImg;
