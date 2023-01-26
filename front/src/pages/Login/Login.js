import React from 'react';
import { InputGray } from '../../components/common/InputGray/InputGray';
import { BoxLogin } from './style';

function Login() {
  return (
    <BoxLogin radius={'0'} margin={'0'} height={'100vh'}>
      <img src="/assets/images/logo.png" alt="아임파인" width="280" />
      <div>
        <InputGray />
      </div>
    </BoxLogin>
  );
}

export default Login;
