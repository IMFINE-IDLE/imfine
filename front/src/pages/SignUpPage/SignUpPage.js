import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { isEmailValid } from '../../utils/userUtils';
import InputId from '../../components/SignUp/InputId/InputId';
import InputName from '../../components/SignUp/InputName/InputName';
import InputEmail from '../../components/SignUp/InputEmail/InputEmail';
import InputEmailCode from '../../components/SignUp/InputEmailCode/InputEmailCode';
import InputPassword from '../../components/SignUp/InputPassword/InputPassword';
import InputPasswordConfirm from '../../components/SignUp/InputPasswordConfirm/InputPasswordConfirm';
import CheckTermsOfService from '../../components/SignUp/CheckTermsOfService/CheckTermsOfService';
import { signUp } from '../../store/slice/userSlice';
import {
  BoxTopSignUp,
  TitleSignUp,
  CloverImg,
  BoxInnerSignup,
  BtnSignup,
} from './style';

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrMsg] = useState({
    idErrorMsg: '',
    nameErrorMsg: '',
    emailErrorMsg: '',
    emailVerifyErrorMsg: '',
    pwErrorMsg: '',
    confirmPwErrorMsg: '',
  });
  const [emailVerify, setEmailVerify] = useState(false); // 이메일 인증메일 전송 단계 체크: valid, emailSent
  const [doneEmailVerify, setDoneEmailVerify] = useState(false); // 이메일 인증 완료 여부 체크
  const [timeLeft, setTimeLeft] = useState(179);

  const [checkedTerms, setCheckedTerms] = useState(false);

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
        } else {
          // 12자 이하일 경우 (유효할 경우에만) 아이디 중복체크
          const asyncCheckId = async () => {
            try {
              await axios.get(api.user.checkId(currInput.id));
              setErrMsg((prev) => {
                return { ...prev, idErrorMsg: '' };
              });
            } catch (err) {
              console.log(err.response.data);
              setErrMsg((prev) => {
                return { ...prev, idErrorMsg: err.response.data.message };
              });
            }
          };
          asyncCheckId();
        }
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
        } else {
          // 10자 이하일 경우 (유효할 경우에만) 닉네임 중복체크
          const asyncCheckName = async () => {
            try {
              await axios.get(api.user.checkName(currInput.name));
              setErrMsg((prev) => {
                return { ...prev, nameErrorMsg: '' };
              });
            } catch (err) {
              // console.log(err.response.data);
              setErrMsg((prev) => {
                return { ...prev, nameErrorMsg: err.response.data.message };
              });
            }
          };
          asyncCheckName();
        }
      }

      // 3. 이메일 유효성 검사
      if (currInput.email) {
        checkStage(3);
        if (isEmailValid(currInput.email)) {
          // 유효한 경우에만 이메일 중복체크
          const asyncCheckEmail = async () => {
            try {
              await axios.get(api.user.checkEmail(currInput.email));
              setErrMsg((prev) => {
                return { ...prev, emailErrorMsg: '' };
              });

              // 이메일 인증 버튼 활성화
              if (emailVerify === false) {
                setEmailVerify('valid');
              }
            } catch (err) {
              console.log(err.response.data);
              setErrMsg((prev) => {
                return { ...prev, emailErrorMsg: err.response.data.message };
              });
            }
          };
          asyncCheckEmail();
        } else {
          setErrMsg((prev) => {
            return {
              ...prev,
              emailErrorMsg: '유효한 이메일 형식이 아닙니다.',
            };
          });
        }
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

      return currInput;
    },
    {
      id: '',
      name: '',
      email: '',
      emailCode: '',
      password: '',
      confirmPassword: '',
    }
  );
  const { id, name, email, emailCode, password, confirmPassword } = inputValue;
  const {
    idErrorMsg,
    nameErrorMsg,
    emailErrorMsg,
    emailVerifyErrorMsg,
    pwErrorMsg,
    confirmPwErrorMsg,
  } = errorMsg;

  // 이메일 인증 코드 전송
  const sendVerifyEmail = async (emailState) => {
    try {
      // 재전송인 경우 alert
      if (emailVerify === 'emailSent') {
        alert('이메일이 재전송되었습니다.');
        // 코드창 초기화
        inputEvent({ emailCode: '' });
      }
      // else {
      //   alert('이메일이 전송되었습니다.');
      // }
      setTimeLeft(179); // 타이머 세팅
      const data = { email: emailState };
      await axios.post(api.user.verifyEmail(emailState), data);
    } catch (err) {
      console.log(err);
    }
  };

  // 이메일 인증 코드 확인
  const confirmVerifyEmailCode = async () => {
    const data = { email, confirm: emailCode };
    try {
      const res = await axios.post(api.user.confirmEmail(), data);
      console.log(res);
      setDoneEmailVerify(true);
      alert('이메일 인증이 완료되었습니다.');
      setErrMsg((prev) => {
        return {
          ...prev,
          emailVerifyErrorMsg: '',
        };
      });
    } catch (err) {
      console.log(err);
      setErrMsg((prev) => {
        return {
          ...prev,
          emailVerifyErrorMsg: err.response.data.message,
        };
      });
    }
  };

  // 전체 유효 여부 확인
  const noErr = Object.values(errorMsg).every((x) => x === '' || x === null);
  if (
    noErr &&
    id.length > 0 &&
    id.length <= 12 &&
    name.length > 0 &&
    name.length <= 12 &&
    email.length > 0 &&
    doneEmailVerify &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    checkedTerms
  ) {
    if (!isValid) setIsValid(true);
  } else {
    if (isValid) setIsValid(false);
  }

  // 최종 회원 가입
  const signUpByData = async () => {
    const userData = {
      uid: id,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      await dispatch(signUp(userData)).unwrap();
      navigate('/signup/setting');
    } catch (rejectWithValue) {
      console.log(rejectWithValue);
      alert(rejectWithValue.response.data.message);
    }
  };

  return (
    <>
      <BoxTopSignUp>
        <CloverImg />
        <TitleSignUp>회원가입</TitleSignUp>
      </BoxTopSignUp>
      <BoxInnerSignup>
        <form action="">
          <InputId id={id} inputEvent={inputEvent} idErrorMsg={idErrorMsg} />
          <InputName
            name={name}
            inputEvent={inputEvent}
            nameErrorMsg={nameErrorMsg}
          />
          <InputEmail
            email={email}
            emailErrorMsg={emailErrorMsg}
            inputEvent={inputEvent}
            doneEmailVerify={doneEmailVerify}
            emailVerify={emailVerify}
            setEmailVerify={setEmailVerify}
            sendVerifyEmail={sendVerifyEmail}
          />
          {emailVerify === 'emailSent' && !doneEmailVerify && (
            <InputEmailCode
              emailCode={emailCode}
              inputEvent={inputEvent}
              emailVerifyErrorMsg={emailVerifyErrorMsg}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              confirmVerifyEmailCode={confirmVerifyEmailCode}
            />
          )}
          <InputPassword
            password={password}
            inputEvent={inputEvent}
            pwErrorMsg={pwErrorMsg}
          />
          <InputPasswordConfirm
            confirmPassword={confirmPassword}
            inputEvent={inputEvent}
            confirmPwErrorMsg={confirmPwErrorMsg}
          />
          <CheckTermsOfService
            checkedTerms={checkedTerms}
            setCheckedTerms={setCheckedTerms}
          />
          {isValid ? (
            <BtnSignup
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                signUpByData();
              }}
            >
              회원가입하기
            </BtnSignup>
          ) : (
            <BtnSignup
              type="button"
              color={'gray700'}
              disabled
              style={{ cursor: 'not-allowed' }}
            >
              회원가입하기
            </BtnSignup>
          )}
        </form>
      </BoxInnerSignup>
    </>
  );
}

export default React.memo(SignUpPage);
