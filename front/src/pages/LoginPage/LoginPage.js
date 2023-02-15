import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputGray } from '../../components/common/InputGray/InputGray';
import useInput from '../../hooks/useInput';
import { logIn } from '../../store/slice/userSlice';
import {
  BoxLogin,
  BoxInnerLogin,
  BoxInput,
  BtnLogin,
  BoxOptions,
  SpanOption,
  Label,
} from './style';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uid, setUid] = useInput('');
  const [password, setPassword] = useInput('');
  const logInByData = async () => {
    if (uid.length < 1) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (password.length < 1) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    const userData = {
      uid,
      password,
    };
    try {
      const success = await dispatch(logIn(userData)).unwrap();
      // console.log(success);
      navigate('/');
    } catch (rejectWithValue) {
      console.log(rejectWithValue);
      alert(rejectWithValue.response.data.message);
    }
  };

  return (
    <BoxLogin radius={'0'} margin={'0'} height={'100vh'}>
      <img src="/assets/images/logo.png" alt="아임파인" width="280" />
      <BoxInnerLogin>
        <form action="">
          <BoxInput>
            <Label htmlFor="loginInput">아이디</Label>
            <InputGray
              value={uid}
              onChange={setUid}
              id="loginInput"
              type="text"
              required
              autoFocus
              maxLength="12"
              padding={'1em'}
              margin={'1em 0 0'}
              autoComplete="false"
            />
          </BoxInput>
          <BoxInput>
            <Label htmlFor="passwordInput">비밀번호</Label>
            <InputGray
              value={password}
              onChange={setPassword}
              id="passwordInput"
              type="password"
              required
              padding={'1em'}
              margin={'1em 0'}
              autoComplete="false"
            />
          </BoxInput>
          <BtnLogin
            onClick={(e) => {
              e.preventDefault();
              logInByData();
            }}
            margin={'0'}
            padding={'1em'}
            fontSize={'1em'}
            type="submit"
          >
            로그인하기
          </BtnLogin>
          <BoxOptions>
            <SpanOption onClick={() => navigate('/find-id')}>
              아이디 찾기
            </SpanOption>
            |
            <SpanOption onClick={() => navigate('/find-password')}>
              비밀번호 찾기
            </SpanOption>
            |
            <SpanOption onClick={() => navigate('/signup')}>
              회원가입
            </SpanOption>
          </BoxOptions>
        </form>
      </BoxInnerLogin>
    </BoxLogin>
  );
}

export default Login;
