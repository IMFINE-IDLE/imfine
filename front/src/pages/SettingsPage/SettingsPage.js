import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { logOut } from '../../store/slice/userSlice';
import {
  ProfileConfigContainer,
  ProfileConfigOptionBtn,
} from '../Profile/ProfileConfigPage/style';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [withDrawModalOpen, setWithDrawModalOpen] = useState(false);

  // 로그아웃
  const logOutByData = async () => {
    try {
      const success = await dispatch(logOut()).unwrap();
      console.log(success);
    } catch (rejectWithValue) {
      console.log(rejectWithValue);
      // alert(rejectWithValue);
      navigate('/login');
    }
  };

  // 탈퇴 요청
  const fetchWithdraw = () => {};

  return (
    <>
      <NavBarBasic Back={true} Text="계정 설정" BackgroundColor={'main'} />

      <ProfileConfigContainer radius="0" height="calc(100vh - 71px)">
        <ProfileConfigOptionBtn onClick={() => navigate(`/change-password`)}>
          <span>비밀번호 변경하기</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn
          onClick={() => {
            setLogOutModalOpen(true);
          }}
        >
          <span>로그아웃</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn onClick={() => setWithDrawModalOpen(true)}>
          <span>탈퇴하기</span>
        </ProfileConfigOptionBtn>
      </ProfileConfigContainer>
      {logOutModalOpen && (
        <Modal
          type={'로그아웃'}
          setModalOpen={setLogOutModalOpen}
          apiFunc={logOutByData}
        />
      )}
      {withDrawModalOpen && (
        <Modal
          type={'탈퇴'}
          setModalOpen={setWithDrawModalOpen}
          apiFunc={fetchWithdraw}
        />
      )}
    </>
  );
};

export default SettingsPage;
