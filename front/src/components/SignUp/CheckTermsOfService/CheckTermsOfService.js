import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { BoxCheck } from './style';

function CheckTermsOfService({ checkedTerms, setCheckedTerms }) {
  return (
    <BoxCheck onClick={() => setCheckedTerms((prev) => !prev)}>
      <span>
        <FiCheckCircle
          size={'16px'}
          style={{
            marginRight: '.3em',
            color: checkedTerms ? 'var(--main-color)' : null,
          }}
        />
        서비스 이용약관 및 개인정보 처리방침에 동의합니다.
      </span>
    </BoxCheck>
  );
}

export default CheckTermsOfService;
