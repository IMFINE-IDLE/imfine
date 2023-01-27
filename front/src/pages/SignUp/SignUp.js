import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
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
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);

  const [inputValue, inputEvent] = useReducer(
    (prev, next) => {
      const {
        id,
        name,
        email,
        password,
        confirmPassword,
        isOpen,
        medicalIdList,
      } = { ...prev, ...next };

      return { ...prev, ...next };
    },
    {
      id: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isOpen: true,
      medicalIdList: [],
    },
  );
  const { id, name, email, password, confirmPassword, isOpen, medicalIdList } =
    inputValue;

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
            label="아이디"
            value={id}
            id="idInput"
            type="text"
            required
            autoFocus
            maxLength="12"
            onChange={(e) => inputEvent({ id: e.target.value })}
          />
          <Label htmlFor="nameInput">닉네임</Label>
          <InputSignUp
            value={name}
            id="nameInput"
            type="text"
            required
            maxLength="12"
            onChange={(e) => inputEvent({ name: e.target.value })}
          />
          <Label htmlFor="emailInput">이메일</Label>
          <InputSignUp
            value={email}
            id="emailInput"
            type="email"
            required
            onChange={(e) => inputEvent({ email: e.target.value })}
          />
          <Label htmlFor="passwordInput">비밀번호</Label>
          <InputSignUp
            value={password}
            id="passwordInput"
            type="password"
            required
            onChange={(e) => inputEvent({ password: e.target.value })}
          />
          <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
          <InputSignUp
            value={confirmPassword}
            id="confirmPasswordInput"
            type="password"
            required
            onChange={(e) => inputEvent({ confirmPassword: e.target.value })}
          />
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
