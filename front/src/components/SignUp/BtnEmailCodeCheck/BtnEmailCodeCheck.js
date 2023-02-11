import React from 'react';
import { BtnEmailCheckButton } from '../BtnEmailCheck/style';

function BtnEmailCodeCheck({ emailCode, confirmVerifyEmailCode }) {
  if (emailCode.length > 0) {
    return (
      <BtnEmailCheckButton
        type="button"
        onClick={() => {
          confirmVerifyEmailCode();
        }}
      >
        인증
      </BtnEmailCheckButton>
    );
  } else {
    return (
      <BtnEmailCheckButton
        type="button"
        disabled
        style={{ background: 'var(--gray700-color)' }}
      >
        인증
      </BtnEmailCheckButton>
    );
  }
}

export default BtnEmailCodeCheck;
