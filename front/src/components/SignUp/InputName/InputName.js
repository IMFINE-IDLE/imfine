import React from 'react';
import {
  ErrorMsg,
  InfoSpan,
  InputSignUp,
  Label,
} from '../../../pages/SignUpPage/style';

function InputName({ name, inputEvent, nameErrorMsg }) {
  return (
    <>
      <Label htmlFor="nameInput">닉네임</Label>
      <InfoSpan>&nbsp;최대 10자</InfoSpan>
      <InputSignUp
        value={name}
        id="nameInput"
        type="text"
        // required
        // maxLength="10"
        onChange={(e) => inputEvent({ name: e.target.value })}
        style={nameErrorMsg ? { border: '1px solid var(--red-color)' } : null}
      />
      {nameErrorMsg && <ErrorMsg>{nameErrorMsg}</ErrorMsg>}
    </>
  );
}

export default InputName;
