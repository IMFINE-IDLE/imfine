import React from 'react';
import {
  DivEmail,
  ErrorMsg,
  InputSignUp,
  Label,
} from '../../../pages/SignUpPage/style';
import BtnEmailCheck from '../BtnEmailCheck/BtnEmailCheck';

function InputEmail({
  email,
  emailErrorMsg,
  inputEvent,
  doneEmailVerify,
  emailVerify,
  setEmailVerify,
  sendVerifyEmail,
}) {
  return (
    <>
      <Label htmlFor="emailInput">이메일</Label>
      <DivEmail>
        <InputSignUp
          value={email}
          id="emailInput"
          type="email"
          // required
          onChange={(e) => inputEvent({ email: e.target.value })}
          style={
            emailErrorMsg ? { border: '1px solid var(--red-color)' } : null
          }
          readOnly={doneEmailVerify ? true : false}
        />
        {!doneEmailVerify && (
          <BtnEmailCheck
            email={email}
            emailVerify={emailVerify}
            setEmailVerify={setEmailVerify}
            sendVerifyEmail={sendVerifyEmail}
          />
        )}
      </DivEmail>
      {emailErrorMsg && <ErrorMsg>{emailErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputEmail;
