import React from 'react';
import {
  BoxSignUp,
  TitleSignUp,
  CloverImg,
  BoxInnerSignup,
  Label,
  InputSignUp,
  BtnSignup,
} from './style';

function SignUp() {
  return (
    <div>
      <BoxSignUp>
        <CloverImg />
        <TitleSignUp>회원가입</TitleSignUp>
      </BoxSignUp>
      <BoxInnerSignup>
        <form action="">
          <Label htmlFor="idInput">아이디</Label>
          <InputSignUp
            id="idInput"
            type="text"
            required
            autoFocus
            maxLength="12"
          />

          <Label htmlFor="nameInput">닉네임</Label>
          <InputSignUp id="nameInput" type="text" required maxLength="12" />
          <Label htmlFor="emailInput">이메일</Label>
          <InputSignUp id="emailInput" type="email" required />
          <Label htmlFor="passwordInput">비밀번호</Label>
          <InputSignUp id="passwordInput" type="password" required />
          <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
          <InputSignUp id="confirmPasswordInput" type="password" required />
          <BtnSignup
            margin={'0'}
            padding={'1em'}
            fontSize={'1em'}
            type="submit"
          >
            회원 가입
            {/* 다음 단계 */}
          </BtnSignup>
        </form>
      </BoxInnerSignup>
    </div>
  );
}

export default SignUp;
