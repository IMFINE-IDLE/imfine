import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import {
  ProfileConfigContainer,
  ProfileConfigOptionBtn,
} from '../Profile/ProfileConfigPage/style';

const SettingsPage = () => {
  const navigate = useNavigate();

  // 탈퇴 요청
  const fetchWithdraw = () => {};

  return (
    <>
      <NavBarBasic Back={true} Text="계정 설정" BackgroundColor={'main'} />

      <ProfileConfigContainer radius="0" height="calc(100vh - 71px)">
        <ProfileConfigOptionBtn onClick={() => navigate(`/change-password`)}>
          <span>비밀번호 변경하기</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn onClick={() => navigate('/logout')}>
          <span>로그아웃하기</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn>
          <span>탈퇴하기</span>
        </ProfileConfigOptionBtn>
      </ProfileConfigContainer>
    </>
  );
};

export default SettingsPage;
