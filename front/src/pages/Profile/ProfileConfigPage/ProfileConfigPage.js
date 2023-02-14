import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import {
  ProfileConfigContainer,
  ProfileConfigOptionBtn,
  TitleText,
  NicknameInput,
  SubmitBtn,
  ErrorMsg,
  MedicalBtn,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from './style';

const ProfileConfigPage = () => {
  /*
   * Hooks
   */
  const { uid } = useParams();
  const { name, medicalList, open } = useLocation().state;

  // 상세내용 보여주기용 state
  const [showChangeName, setShowChangeName] = useState(false);
  const [showPickMedicals, setShowPickMedicals] = useState(false);
  const [showOpenBtn, setShowOpenBtn] = useState(false);

  // 값 저장할 state
  const [newName, setNewName] = useState(name);
  const [medicals, setMedicals] = useState(medicalList);
  const [isOpen, setIsOpen] = useState(open);

  // 에러메시지
  const [nameErrorMsg, setNameErrMsg] = useState('');

  const navigate = useNavigate();

  /*
   * Functions
   */

  // 닉네임 변경 api 요청
  const fetchChangeName = async () => {
    try {
      // 닉네임 중복체크
      const res = await axios.get(api.user.checkName(newName));
      setNameErrMsg('');

      // 중복체크 응답이 성공일 때 닉네임 변경 요청
      if (res.status === 200) {
        await axios.put(api.user.changeName(), { name: newName });
        setShowChangeName(false);
      }
    } catch (err) {
      setNameErrMsg(err.response.data.message);
      console.error(err);
    }
  };

  // 공개, 비공개 여부 api 요청
  const fetchUpdateOpenStatus = async (open) => {
    try {
      const res = await axios.put(api.user.updateOpenStatus(), { open });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBarBasic Back={true} Text="프로필 수정" BackgroundColor={'main'} />

      <ProfileConfigContainer radius="0">
        <ProfileConfigOptionBtn
          onClick={() => setShowChangeName((prev) => !prev)}
        >
          <span>닉네임 변경하기</span>
        </ProfileConfigOptionBtn>

        {showChangeName && (
          <>
            <FlexDiv height="auto" justify="space-between">
              <TitleText>변경할 닉네임을 적어주세요</TitleText>
              {nameErrorMsg && <ErrorMsg>{nameErrorMsg}</ErrorMsg>}
            </FlexDiv>
            <form>
              <NicknameInput
                value={newName}
                type="text"
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setNewName(e.target.value);
                    setNameErrMsg('');
                  } else {
                    setNewName(newName.substring(0, 10));
                    setNameErrMsg('닉네임은 최대 10자까지 가능합니다');
                  }
                }}
                style={
                  nameErrorMsg ? { border: '1px solid var(--red-color)' } : null
                }
              />
              <SubmitBtn
                radius="20px"
                height="3.5em"
                margin="0.5em 0 1.5em 0"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  fetchChangeName();
                }}
              >
                변경하기
              </SubmitBtn>
            </form>
          </>
        )}

        <ProfileConfigOptionBtn
          onClick={() => setShowPickMedicals((prev) => !prev)}
        >
          <span>관심 질병/수술 설정하기</span>
        </ProfileConfigOptionBtn>

        {showPickMedicals && (
          <>
            <TitleText>내 관심 질병/수술</TitleText>
            <FlexDiv height="auto" justify="start" padding="1em">
              {medicals?.map(({ id, name }) => (
                <MedicalBtn key={id} color="gray">
                  {name}
                </MedicalBtn>
              ))}
              <MedicalBtn
                onClick={() => navigate(`/profile/${uid}/change-symptom`)}
                color="gray700"
              >
                <img src="/assets/icons/edit.svg" />
              </MedicalBtn>
            </FlexDiv>
          </>
        )}

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
