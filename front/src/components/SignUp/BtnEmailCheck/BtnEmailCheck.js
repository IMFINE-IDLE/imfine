import React from 'react';
import { BtnEmailCheckButton } from './style';

function BtnEmailCheck({
  email,
  emailVerify,
  setEmailVerify,
  sendVerifyEmail,
}) {
  if (emailVerify === 'valid') {
    return (
      <BtnEmailCheckButton
        type="button"
        onClick={() => {
          // 이메일 전송
          setEmailVerify('emailSent');
          sendVerifyEmail(email);
        }}
      >
        인증
      </BtnEmailCheckButton>
    );
  } else if (emailVerify === 'emailSent') {
    return (
      <BtnEmailCheckButton
        type="button"
        onClick={() => {
          // 이메일 재전송
          sendVerifyEmail(email);
        }}
      >
        재전송
      </BtnEmailCheckButton>
    );
  } else if (emailVerify === false) {
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

export default BtnEmailCheck;
