import React from 'react';
import {
  DivEmail,
  ErrorMsg,
  GuideMsg,
  InputSignUp,
  Label,
} from '../../../pages/SignUpPage/style';
import BtnEmailCodeCheck from '../BtnEmailCodeCheck/BtnEmailCodeCheck';
import VerfifyEmailTimer from '../VerifyEmailTimer/VerifyEmailTimer';

function InputEmailCode({
  emailCode,
  inputEvent,
  emailVerifyErrorMsg,
  timeLeft,
  setTimeLeft,
  confirmVerifyEmailCode,
}) {
  return (
    <>
      <Label htmlFor="emailCodeInput">인증코드 입력</Label>
      <GuideMsg>이메일로 전송된 인증코드를 입력해주세요.</GuideMsg>
      <DivEmail>
        <InputSignUp
          value={emailCode}
          id="emailCodeInput"
          type="text"
          autoComplete="off"
          // required
          onChange={(e) => inputEvent({ emailCode: e.target.value })}
          style={
            emailVerifyErrorMsg
              ? { border: '1px solid var(--red-color)' }
              : null
          }
        />
        <VerfifyEmailTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <BtnEmailCodeCheck
          emailCode={emailCode}
          confirmVerifyEmailCode={confirmVerifyEmailCode}
        />
      </DivEmail>
      {emailVerifyErrorMsg && <ErrorMsg>{emailVerifyErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputEmailCode;
