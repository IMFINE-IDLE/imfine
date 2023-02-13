import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import {
  ProfileConfigContainer,
  ProfileConfigOptionBtn,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from './style';

const ProfileConfigPage = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { open } = useLocation();
  const [isOpen, setIsOpen] = useState(open);

  const fetchUpdateOpenStatus = async (isOpen) => {
    try {
      await axios.put(
        api.user.updateOpenStatus(),
        { open: isOpen },
        { headers: { 'X-AUTH-TOKEN': localStorage.getItem('accessToken') } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBarBasic Back={true} Text="프로필 수정" />

      <ProfileConfigContainer radius="0">
        <ProfileConfigOptionBtn
          onClick={() => navigate(`/profile/${uid}/change-name`)}
        >
          <span>닉네임 변경하기</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn
          onClick={() => navigate(`/profile/${uid}/change-symptom`)}
        >
          <span>관심 질병/수술 설정하기</span>
        </ProfileConfigOptionBtn>
        <ProfileConfigOptionBtn
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>계정 공개/비공개 설정하기</span>
          <ToggleContainer>
            <ToggleText>{isOpen ? '공개' : '비공개'}</ToggleText>
            <ToggleWrapper isOpen={isOpen}>
              <Toggle
                id="toggle"
                type="checkbox"
                onChange={() => {
                  setIsOpen((prev) => !prev);
                  fetchUpdateOpenStatus(isOpen);
                }}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </ToggleContainer>
        </ProfileConfigOptionBtn>
      </ProfileConfigContainer>
    </>
  );
};

export default ProfileConfigPage;
