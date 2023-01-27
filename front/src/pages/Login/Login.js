import React from 'react';
import { InputGray } from '../../components/common/InputGray/InputGray';
import { BoxLogin, BoxInnerLogin } from './style';

function Login() {
  return (
    <BoxLogin radius={'0'} margin={'0'} height={'100vh'}>
      <img src="/assets/images/logo.png" alt="아임파인" width="280" />
      <BoxInnerLogin>
        <form action="submit">
          <div>
            <label for="loginInput">로그인</label>
            <InputGray
              id="loginInput"
              type="text"
              required
              autofocus
              maxLength="12"
            />
          </div>
          <div>
            <label for="passwordInput">비밀번호</label>
            <InputGray id="passwordInput" type="password" required />
          </div>
        </form>
      </BoxInnerLogin>
    </BoxLogin>
  );
}

export default Login;
