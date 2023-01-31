import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import PickSymptom from '../../components/PickSymptom/PickSymptom';
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
  const [errorMsg, setErrMsg] = useState({
    idErrorMsg: '',
    nameErrorMsg: '',
    emailErrorMsg: '',
    pwErrorMsg: '',
    confirmPwErrorMsg: '',
  });
  const [isNext, setIsNext] = useState(false);
  const [medicalIdList, setMedicalIdList] = useState([]);

  const [inputValue, inputEvent] = useReducer(
    (prev, next) => {
      const currInput = { ...prev, ...next };
      // 기본적으로 다음 단계로 넘어갔는데 이전 단계 완료 안한 경우에만 입력해달라고 뜸 (초기 진입시 전부다 입력해달라고 에러띄우는것 방지)
      const checkStage = (stage) => {
        if (stage >= 2) {
          if (currInput.id.length < 1) {
            setErrMsg((prev) => {
              return { ...prev, idErrorMsg: '아이디를 입력해주세요' };
            });
          }
        }
        if (stage >= 3) {
          if (currInput.name.length < 1) {
            setErrMsg((prev) => {
              return { ...prev, nameErrorMsg: '닉네임을 입력해주세요' };
            });
          }
        }
        if (stage >= 4) {
          if (currInput.email.length < 1) {
            setErrMsg((prev) => {
              return { ...prev, emailErrorMsg: '이메일을 입력해주세요' };
            });
          }
        }
        if (stage >= 5) {
          if (currInput.password.length < 1) {
            setErrMsg((prev) => {
              return { ...prev, pwErrorMsg: '비밀번호를 입력해주세요' };
            });
          }
        }
      };

      // 1. 아이디 유효성 검사
      if (currInput.id) {
        setErrMsg((prev) => {
          return { ...prev, idErrorMsg: '' };
        });

        if (currInput.id.length > 12) {
          console.log('12');
          setErrMsg((prev) => {
            return {
              ...prev,
              idErrorMsg: '아이디는 최대 12자까지 가능합니다.',
            };
          });
          currInput.id = currInput.id.substring(0, 12);
          setTimeout(() => {
            setErrMsg((prev) => {
              return { ...prev, idErrorMsg: '' };
            });
          }, 2000); // 2초뒤 에러 메시지 지움
        }

        // 아이디 중복체크 로직
      }

      // 2. 닉네임 유효성 검사
      if (currInput.name) {
        setErrMsg((prev) => {
          return {
            ...prev,
            nameErrorMsg: '',
          };
        });
        checkStage(2);
        if (currInput.name.length > 10) {
          currInput.name = currInput.name.substring(0, 10);
          setErrMsg((prev) => {
            return {
              ...prev,
              nameErrorMsg: '닉네임은 최대 10자까지 가능합니다',
            };
          });
          setTimeout(() => {
            setErrMsg((prev) => {
              return {
                ...prev,
                nameErrorMsg: '닉네임은 최대 10자까지 가능합니다',
              };
            });
          }, 2000);
        }
        // 닉네임 중복체크 로직
      }

      // 3. 이메일 유효성 검사
      if (currInput.email) {
        setErrMsg((prev) => {
          return {
            ...prev,
            emailErrorMsg: '',
          };
        });
        checkStage(3);
        const isEmailValid = (email) => {
          const emailRegex =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})$/i;

          return emailRegex.test(email);
        };
        if (isEmailValid(currInput.email)) {
          setErrMsg((prev) => {
            return {
              ...prev,
              emailErrorMsg: '',
            };
          });
        } else {
          setErrMsg((prev) => {
            return {
              ...prev,
              emailErrorMsg: '유효한 이메일 형식이 아닙니다.',
            };
          });
        }

        // 이메일 중복체크 로직
      }

      // 4. 비밀번호 유효성 검사
      if (currInput.password) {
        setErrMsg((prev) => {
          return {
            ...prev,
            pwErrorMsg: '',
          };
        });
        checkStage(4);
      }

      // 5. 비밀번호 확인 유효성 검사
      if (currInput.confirmPassword) {
        setErrMsg((prev) => {
          return {
            ...prev,
            confirmPwErrorMsg: '비밀번호가 일치하지 않습니다.',
          };
        });
        checkStage(5);
        if (currInput.confirmPassword === currInput.password) {
          setErrMsg((prev) => {
            return {
              ...prev,
              confirmPwErrorMsg: '',
            };
          });
        }
      }

      // 전체 유효 여부 확인
      const isError = !Object.values(errorMsg).every(
        (x) => x === '' || x === null
      );
      console.log(isError);
      if (
        isError &&
        currInput.id.length > 0 &&
        currInput.name.length > 0 &&
        currInput.email.length > 0 &&
        currInput.password.length > 0 &&
        currInput.confirmPassword.length > 0 &&
        currInput.password === currInput.confirmPassword
      ) {
        console.log('TRUE');
        setIsValid(true);
      } else {
        setIsValid(false);
        setIsNext(false);
      }

      return currInput;
    },
    {
      id: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      // isOpen: true,
      // medicalIdList: [],
    }
  );
  const { id, name, email, password, confirmPassword } = inputValue;
  const {
    idErrorMsg,
    nameErrorMsg,
    emailErrorMsg,
    pwErrorMsg,
    confirmPwErrorMsg,
  } = errorMsg;

  const signUp = async () => {
    const userData = {
      uid: id,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      const res = axios.post(api.user.signUp(), userData);
      console.log(res.data);
      // 리덕스에 토큰 저장
      setIsNext(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isNext ? (
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
                style={
                  idErrorMsg ? { border: '1px solid var(--red-color)' } : null
                }
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
                  emailErrorMsg
                    ? { border: '1px solid var(--red-color)' }
                    : null
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
                style={
                  pwErrorMsg ? { border: '1px solid var(--red-color)' } : null
                }
              />
              {pwErrorMsg && <ErrorMsg>{pwErrorMsg}</ErrorMsg>}

              <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
              <InputSignUp
                value={confirmPassword}
                id="confirmPasswordInput"
                type="password"
                autoComplete="off"
                required
                onChange={(e) =>
                  inputEvent({ confirmPassword: e.target.value })
                }
                style={
                  confirmPwErrorMsg
                    ? { border: '1px solid var(--red-color)' }
                    : null
                }
              />
              {confirmPwErrorMsg && <ErrorMsg>{confirmPwErrorMsg}</ErrorMsg>}
              {isValid ? (
                <BtnSignup
                  margin={'0'}
                  padding={'1em'}
                  fontSize={'1em'}
                  type="submit"
                  onClick={() => signUp()}
                >
                  다음 단계
                </BtnSignup>
              ) : (
                <BtnSignup
                  margin={'0'}
                  padding={'1em'}
                  fontSize={'1em'}
                  type="button"
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
      ) : (
        <>
          <PickSymptom setMedicalIdList={setMedicalIdList} />
          <div style={{ width: '80%', margin: '0 auto' }}>
            <BtnSignup onClick={() => signUp()}>건강해지러 가기!</BtnSignup>
          </div>
        </>
      )}
    </>
  );
}

export default SignUpPage;
