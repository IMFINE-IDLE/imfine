import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputGray } from '../../components/common/InputGray/InputGray';
import useInput from '../../hooks/useInput';
import { logIn } from '../../store/slice/userSlice';
import { BoxLogin, BoxInnerLogin, BoxInput, BtnLogin } from './style';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uid, setUid] = useInput('');
  const [password, setPassword] = useInput('');
  const logInByData = async () => {
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
            <label htmlFor="loginInput">로그인</label>
            <InputGray
              value={uid}
              onChange={setUid}
              id="loginInput"
              type="text"
              required
              autoFocus
              maxLength="12"
              padding={'1em'}
              autoComplete="false"
            />
          </BoxInput>
          <BoxInput>
            <label htmlFor="passwordInput">비밀번호</label>
            <InputGray
              value={password}
              onChange={setPassword}
              id="passwordInput"
              type="password"
              required
              padding={'1em'}
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
        </form>
      </BoxInnerLogin>
    </BoxLogin>
  );
}

export default Login;
