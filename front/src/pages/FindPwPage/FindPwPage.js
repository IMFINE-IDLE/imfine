import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/api';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import FindEmailInput from '../../components/SignUp/FindEmailInput/FindEmailInput';
import { BtnSignup, InputSignUp, Label } from '../SignUpPage/style';

function FindPwPage({ findFromSettings }) {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [inputId, setInputId] = useState('');
  const [doneVerify, setDoneVerify] = useState(false);

  const findPassword = async () => {
    try {
      const res = await axios.get(api.user.findUserPw(inputId, inputEmail));
      console.log(res);
      setDoneVerify(true);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <BoxGrad radius={'0 0 0 0'}>
      <NavBarBasic Text={'비밀번호 찾기'} Back NoRightItem />
      <form style={{ width: '80%', margin: '0 auto' }}>
        {' '}
        <FindEmailInput
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
          errorMsg={emailErrorMsg}
          setErrorMsg={setEmailErrorMsg}
        />
        <Label htmlFor="inputId">아이디</Label>
        <InputSignUp
          value={inputId}
          id="inputId"
          type="text"
          // required
          onChange={(e) => setInputId(e.target.value)}
          // style={
          //   idErrorMsg ? { border: '1px solid var(--red-color)' } : null
          // }
        />
        <BtnSignup
          type="sumbmit"
          onClick={(e) => {
            e.preventDefault();
            findPassword();
          }}
        >
          비밀번호 찾기
        </BtnSignup>
      </form>
    </BoxGrad>
  );
}

export default FindPwPage;
