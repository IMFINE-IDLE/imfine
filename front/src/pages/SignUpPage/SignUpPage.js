import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
// import useInput from '../../hooks/useInput';
import {
  BoxSignUp,
  TitleSignUp,
  CloverImg,
  BoxInnerSignup,
  Label,
  InfoSpan,
  InputSignUp,
  BtnSignup,
  ErrorMsg,
} from './style';

function SignUpPage() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const [idErrorMsg, setIdErrorMsg] = useState(null);
  const [nameErrorMsg, setNameErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [pwErrorMsg, setPwErrorMsg] = useState(null);
  const [confirmPwErrorMsg, setConfirmPwErrorMsg] = useState(null);

  const [inputValue, inputEvent] = useReducer(
    (prev, next) => {
      const currInput = { ...prev, ...next };
      // 기본적으로 다음 단계로 넘어갔는데 이전 단계 완료 안한 경우에만 입력해달라고 뜸 (초기 진입시 전부다 입력해달라고 에러띄우는것 방지)
      const checkStage = (stage) => {
        if (stage >= 2) {
          if (currInput.id.length < 1) {
            setIdErrorMsg('아이디를 입력해주세요');
          }
        }
        if (stage >= 3) {
          if (currInput.name.length < 1) {
            setNameErrorMsg('닉네임을 입력해주세요');
          }
        }
        if (stage >= 4) {
          if (currInput.email.length < 1) {
            setEmailErrorMsg('이메일을 입력해주세요');
          }
        }
      };

      // 1. 아이디 유효성 검사
      if (currInput.id) {
        setIdErrorMsg(null);

        if (currInput.id.length > 12) {
          console.log('12');
          setIdErrorMsg('아이디는 최대 12자까지 가능합니다.');
          currInput.id = currInput.id.substring(0, 12);
          setTimeout(() => {
            setIdErrorMsg(null);
          }, 2000); // 2초뒤 에러 메시지 지움
        }

        // 아이디 중복체크 로직
      }

      // 2. 닉네임 유효성 검사
      if (currInput.name) {
        setNameErrorMsg(null);
        checkStage(2);
        if (currInput.name.length > 10) {
          currInput.name = currInput.name.substring(0, 10);
          setNameErrorMsg('닉네임은 최대 10자까지 가능합니다.');
          setTimeout(() => {
            setNameErrorMsg(null);
          }, 2000);
        }
        // 닉네임 중복체크 로직
      }

      // 3. 이메일 유효성 검사
      if (currInput.email) {
        setEmailErrorMsg(null);
        checkStage(3);
        // let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        const isEmailValid = (email) => {
          const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

          return emailRegex.test(email);
        };
        if (isEmailValid(currInput.email)) {
          setEmailErrorMsg(null);
        } else {
          setEmailErrorMsg('유효한 이메일 형식이 아닙니다.');
        }

        // 이메일 중복체크 로직
      }

      return currInput;
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

  const signUp = async (userData) => {
    console.log(userData);
    try {
      const res = axios({
        url: api.user.signUp(),
        method: 'post',
        data: userData,
      });
      console.log(res.data);
      // 리덕스에 토큰 저장
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <BoxSignUp>
        <CloverImg />
        <TitleSignUp>회원가입</TitleSignUp>
      </BoxSignUp>
      <BoxInnerSignup>
        <form action="">
          <Label htmlFor="idInput">아이디</Label>
          <InfoSpan>&nbsp;최대 12자</InfoSpan>
          <InputSignUp
            value={id}
            id="idInput"
            type="text"
            required
            autoFocus
            // maxLength="12"
            onChange={(e) => inputEvent({ id: e.target.value })}
            style={idErrorMsg ? { border: '1px solid var(--red-color)' } : null}
          />
          {idErrorMsg && <ErrorMsg>{idErrorMsg}</ErrorMsg>}

          <Label htmlFor="nameInput">닉네임</Label>
          <InfoSpan>&nbsp;최대 10자</InfoSpan>
          <InputSignUp
            value={name}
            id="nameInput"
            type="text"
            required
            // maxLength="10"
            onChange={(e) => inputEvent({ name: e.target.value })}
            style={
              nameErrorMsg ? { border: '1px solid var(--red-color)' } : null
            }
          />
          {nameErrorMsg && <ErrorMsg>{nameErrorMsg}</ErrorMsg>}

          <Label htmlFor="emailInput">이메일</Label>
          <InputSignUp
            value={email}
            id="emailInput"
            type="email"
            required
            onChange={(e) => inputEvent({ email: e.target.value })}
            style={
              emailErrorMsg ? { border: '1px solid var(--red-color)' } : null
            }
          />
          {emailErrorMsg && <ErrorMsg>{emailErrorMsg}</ErrorMsg>}

          <Label htmlFor="passwordInput">비밀번호</Label>
          <InputSignUp
            value={password}
            id="passwordInput"
            type="password"
            autoComplete="off"
            required
            onChange={(e) => inputEvent({ password: e.target.value })}
          />
          <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
          <InputSignUp
            value={confirmPassword}
            id="confirmPasswordInput"
            type="password"
            autoComplete="off"
            required
            onChange={(e) => inputEvent({ confirmPassword: e.target.value })}
          />
          {isValid ? (
            <BtnSignup
              margin={'0'}
              padding={'1em'}
              fontSize={'1em'}
              type="submit"
              onClick={() => signUp(inputValue)}
            >
              다음 단계
            </BtnSignup>
          ) : (
            <BtnSignup
              margin={'0'}
              padding={'1em'}
              fontSize={'1em'}
              type="submit"
              color={'gray700'}
              disabled
              style={{ cursor: 'not-allowed' }}
            >
              다음 단계
            </BtnSignup>
          )}
        </form>
      </BoxInnerSignup>
    </div>
  );
}

export default SignUpPage;
