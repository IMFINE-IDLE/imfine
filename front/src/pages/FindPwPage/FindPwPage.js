import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/api';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import FindEmailInput from '../../components/SignUp/FindEmailInput/FindEmailInput';
import { BtnSignup, InputSignUp, Label } from '../SignUpPage/style';

// changeFromSettings : 비번 변경에서 진입시 true
function FindPwPage({ changeFromSettings }) {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [inputId, setInputId] = useState('');
  const [doneVerify, setDoneVerify] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const findPasswordWithOutLogin = async () => {
    try {
      const res = await axios.get(api.user.findUserPw(inputId, inputEmail));
      console.log(res);
      setDoneVerify(true);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const checkOriginalPasswordWithLogin = async () => {};

  const changePasswordWithLogin = async () => {};

  const changePasswordWithOutLogin = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const data = {
      uid: inputId,
      password: newPassword,
    };
    try {
      const res = await axios.put(api.user.findUserPw, data);
      console.log(res);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  // 비번 변경에서 진입 (changeFromSettings true) -> 이메일 및 아이디 확인 불필요, 기존 비번 확인 필요
  // 비번 찾기에서 진입 (changeFromSettings false) -> 이메일 및 아이디 확인 필요, 기존 비번 확인 불필요
  return (
    <BoxGrad radius={'0 0 0 0'} height={'100vh'}>
      <NavBarBasic Text={'비밀번호 찾기'} Back NoRightItem />

      {!doneVerify || !changeFromSettings ? (
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
              findPasswordWithOutLogin();
            }}
          >
            비밀번호 찾기
          </BtnSignup>
        </form>
      ) : (
        <>
          <form style={{ width: '80%', margin: '0 auto' }}>
            {changeFromSettings && (
              <>
                <Label htmlFor="originalPw">기존 비밀번호</Label>
                <InputSignUp
                  type="password"
                  value={originalPassword}
                  id="originalPw"
                  autoComplete="off"
                  onChange={(e) => setOriginalPassword(e.target.value)}
                />
              </>
            )}
            <Label htmlFor="newPw">새 비밀번호</Label>
            <InputSignUp
              type="password"
              value={newPassword}
              id="newPw"
              autoComplete="off"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Label htmlFor="confirmNewPw">새 비밀번호 확인</Label>
            <InputSignUp
              type="password"
              value={confirmNewPassword}
              id="confirmNewPw"
              autoComplete="off"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <BtnSignup
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (changeFromSettings) {
                  changePasswordWithLogin();
                } else {
                  changePasswordWithOutLogin();
                }
              }}
            >
              회원가입하기
            </BtnSignup>
          </form>
        </>
      )}
    </BoxGrad>
  );
}

export default FindPwPage;
