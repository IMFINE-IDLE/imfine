import React from 'react';
import {
  ErrorMsg,
  InfoSpan,
  InputSignUp,
  Label,
} from '../../../pages/SignUpPage/style';

function InputId({ id, inputEvent, idErrorMsg }) {
  return (
    <>
      <Label htmlFor="idInput">아이디</Label>
      <InfoSpan>&nbsp;최대 12자</InfoSpan>
      <InputSignUp
        value={id}
        id="idInput"
        type="text"
        // required
        autoFocus
        // maxLength="12"
        onChange={(e) => inputEvent({ id: e.target.value })}
        style={idErrorMsg ? { border: '1px solid var(--red-color)' } : null}
      />
      {idErrorMsg && <ErrorMsg>{idErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputId;
