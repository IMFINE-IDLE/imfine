import React, { useState } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import { BtnSignup, ErrorMsg, InputSignUp, Label } from '../SignUpPage/style';
import { isEmailValid } from '../../utils/utils';
import axios from 'axios';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { DivFindResult, SpanUserId } from './style';

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
          <Label htmlFor="email">이메일</Label>
          <InputSignUp
            value={inputEmail}
            id="email"
            type="text"
            // required
            autoFocus
            // maxLength="12"
            onChange={(e) => {
              const currInput = e.target.value;
              // if (currInput.length < 1) {
              //   alert('이메일을 입력해주세요.');
              //   return;
              // }
              setInputEmail(currInput);
              if (!isEmailValid(currInput)) {
                setErrorMsg('유효한 이메일 형식이 아닙니다.');
              } else {
                setErrorMsg('');
              }
            }}
            style={errorMsg ? { border: '1px solid var(--red-color)' } : null}
          />
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
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
