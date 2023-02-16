import React from 'react';
import { ErrorMsg, InputSignUp, Label } from '../../../pages/SignUpPage/style';

function InputPasswordConfirm({
  confirmPassword,
  inputEvent,
  confirmPwErrorMsg,
}) {
  return (
    <>
      <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
      <InputSignUp
        value={confirmPassword}
        id="confirmPasswordInput"
        type="password"
        autoComplete="off"
        // required
        onChange={(e) => inputEvent({ confirmPassword: e.target.value })}
        style={
          confirmPwErrorMsg ? { border: '1px solid var(--red-color)' } : null
        }
      />
      {confirmPwErrorMsg && <ErrorMsg>{confirmPwErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputPasswordConfirm;
