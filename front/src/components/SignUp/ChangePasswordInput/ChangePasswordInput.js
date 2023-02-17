import React from 'react';
import { ErrorMsg, InputSignUp, Label } from '../../../pages/SignUpPage/style';

function ChangePasswordInput({
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  errorMsg,
  setErrorMsg,
}) {
  return (
    <>
      <Label htmlFor="newPw">새 비밀번호</Label>
      <InputSignUp
        type="password"
        value={newPassword}
        id="newPw"
        autoComplete="off"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Label htmlFor="confirmNewPw">새 비밀번호 확인</Label>
      <InputSignUp
        type="password"
        value={confirmNewPassword}
        id="confirmNewPw"
        autoComplete="off"
        onChange={(e) => {
          setConfirmNewPassword(e.target.value);
          // if (newPassword !== confirmNewPassword) {
          //   setErrorMsg('비밀번호가 일치하지 않습니다.');
          // } else {
          //   setErrorMsg('');
          // }
        }}
        style={errorMsg ? { border: '1px solid var(--red-color)' } : null}
      />
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </>
  );
}

export default ChangePasswordInput;
