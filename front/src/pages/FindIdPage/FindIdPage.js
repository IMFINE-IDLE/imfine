import React, { useState } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { BtnSignup } from '../SignUpPage/style';
import axios from 'axios';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { DivFindResult, SpanUserId } from './style';
import FindEmailInput from '../../components/SignUp/FindEmailInput/FindEmailInput';

function FindIdPage() {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [userId, setUserId] = useState('');

  const findId = async () => {
    if (errorMsg) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }
    if (inputEmail.length < 1) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      const res = await axios.get(api.user.findUserId(inputEmail));
      console.log(res);
      setUserId(res.data.data.uid);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <BoxGrad radius={'0 0 0 0'}>
      <NavBarBasic Text={'아이디 찾기'} Back NoRightItem />
      {!userId ? (
        <form style={{ width: '80%', margin: '0 auto' }}>
          <FindEmailInput
            inputEmail={inputEmail}
            setInputEmail={setInputEmail}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
          <BtnSignup
            type="sumbmit"
            onClick={(e) => {
              e.preventDefault();
              findId();
            }}
          >
            아이디 찾기
          </BtnSignup>
        </form>
      ) : (
        <DivFindResult direction={'column'}>
          <SpanUserId>아이디: {userId}</SpanUserId>
          <BtnSignup onClick={() => navigate('/find-password')}>
            비밀번호 찾기
          </BtnSignup>
          <BtnSignup onClick={() => navigate('/login')}>로그인 하기</BtnSignup>
        </DivFindResult>
      )}
    </BoxGrad>
  );
}

export default FindIdPage;
