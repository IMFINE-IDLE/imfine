import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import api from '../../api/api';
import { BoxGrad } from '../../components/common/BoxGrad/BoxGrad';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import ChangePasswordInput from '../../components/SignUp/ChangePasswordInput/ChangePasswordInput';
import FindEmailInput from '../../components/SignUp/FindEmailInput/FindEmailInput';
import { BtnSignup, InputSignUp, Label } from '../SignUpPage/style';

/**
 * changeFromSettings : 비번 변경에서 진입시 true
 */

function FindPwPage() {
  const location = useLocation();
  const changeFromSettings = location.state.changeFromSettings;
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [inputId, setInputId] = useState('');
  const [doneVerify, setDoneVerify] = useState(false);

  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

  const checkIdEmailWithOutLogin = async () => {
    try {
      const res = await axios.get(
        api.user.checkUserIdEmail(inputId, inputEmail)
      );
      console.log(res);
      setDoneVerify(true);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const changePasswordWithLogin = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setConfirmPasswordErrorMsg('');
    const data = {
      password: originalPassword,
      newPassword: newPassword,
    };
    try {
      const res = await axios.put(api.user.changeUserPwWithLogin(), data);
      console.log(res);
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const changePasswordWithOutLogin = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setConfirmPasswordErrorMsg('');

    const data = {
      uid: inputId,
      password: newPassword,
    };
    try {
      const res = await axios.put(api.user.changeUserPwWithOutLogin(), data);
      console.log(res);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (changeFromSettings) {
      setDoneVerify(true);
    }
  }, [changeFromSettings]);

  /**
   * 비번 변경에서 진입 (changeFromSettings true) -> 이메일 및 아이디 확인 불필요, 기존 비번 확인 필요
   * 비번 찾기에서 진입 (changeFromSettings false) -> 이메일 및 아이디 확인 필요, 기존 비번 확인 불필요
   */

  return (
    <BoxGrad radius={'0 0 0 0'} height={'100vh'}>
      <NavBarBasic Text={'비밀번호 찾기'} Back NoRightItem />
      {!doneVerify ? (
        <form style={{ width: '80%', margin: '0 auto' }}>
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
              checkIdEmailWithOutLogin();
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
                  onChange={(e) => {
                    setOriginalPassword(e.target.value);
                  }}
                />
              </>
            )}
            <ChangePasswordInput
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              errorMsg={confirmPasswordErrorMsg}
              setErrorMsg={setConfirmPasswordErrorMsg}
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
              비밀번호 변경하기
            </BtnSignup>
          </form>
        </>
      )}
    </BoxGrad>
  );
}

export default FindPwPage;
