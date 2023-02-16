import React from 'react';
import { ErrorMsg, InputSignUp, Label } from '../../../pages/SignUpPage/style';

function InputPassword({ password, inputEvent, pwErrorMsg }) {
  return (
    <>
      <Label htmlFor="passwordInput">비밀번호</Label>
      <InputSignUp
        value={password}
        id="passwordInput"
        type="password"
        autoComplete="off"
        // required
        onChange={(e) => inputEvent({ password: e.target.value })}
        style={pwErrorMsg ? { border: '1px solid var(--red-color)' } : null}
      />
      {pwErrorMsg && <ErrorMsg>{pwErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputPassword;
