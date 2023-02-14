import React from 'react';
import { ErrorMsg, InputSignUp, Label } from '../../../pages/SignUpPage/style';
import { isEmailValid } from '../../../utils/utils';

function FindEmailInput({ inputEmail, setInputEmail, errorMsg, setErrorMsg }) {
  return (
    <>
      <Label htmlFor="email">이메일</Label>
      <InputSignUp
        value={inputEmail}
        id="email"
        type="text"
        // required
        autoFocus
        onChange={(e) => {
          const currInput = e.target.value;
          setInputEmail(currInput);
          if (!isEmailValid(currInput)) {
            setErrorMsg('유효한 이메일 형식이 아닙니다.');
          } else {
            setErrorMsg('');
          }
        }}
        style={errorMsg ? { border: '1px solid var(--red-color)' } : null}
      />
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </>
  );
}

export default FindEmailInput;
