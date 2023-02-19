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
  OKMsg,
  MedicalBtn,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { updateAutoPlay } from '../../../store/slice/userSlice';

const ProfileConfigPage = () => {
  /*
   * Hooks
   */
  const { uid } = useParams();
  const { name, medicalList, open, medicalsOpen } = useLocation().state;

  // 상세내용 보여주기용 state
  const [showChangeName, setShowChangeName] = useState(false);
  const [showPickMedicals, setShowPickMedicals] = useState(medicalsOpen);

  // 값 저장할 state
  const [newName, setNewName] = useState(name);
  const [medicals, setMedicals] = useState(medicalList);
  const [isOpen, setIsOpen] = useState(open);
  const paperMusicAutoPlay = useSelector(
    (state) => state.user.paperMusicAutoPlay
  );
  const [musicAutoPlay, setMusicAutoPlay] = useState(paperMusicAutoPlay);
  const dispatch = useDispatch();

  // 성공메시지, 에러메시지
  const [nameOKMsg, setNameOKMsg] = useState('');
  const [nameErrorMsg, setNameErrMsg] = useState('');

  const navigate = useNavigate();

  /*
   * Functions
   */

  // 닉네임 중복체크
  const fetchCheckNameDuplicated = async () => {
    setNameErrMsg('');
    setNameOKMsg('');
    try {
      const res = await axios.get(api.user.checkName(newName));

      if (res.status === 200) {
        setNameOKMsg('사용 가능한 닉네임입니다');
      }
    } catch (err) {
      setNameErrMsg(err.response.data.message);
      console.error(err);
    }
  };

  // 닉네임 변경 요청
  const fetchChangeName = async () => {
    setNameErrMsg('');
    setNameOKMsg('');
    try {
      const res = await axios.get(api.user.checkName(newName));

      // 중복체크 응답이 성공일 때 닉네임 변경 요청
      if (res.status === 200) {
        await axios.put(api.user.changeName(), { name: newName });
      }
    } catch (err) {
      setNameErrMsg(err.response.data.message);
      console.error(err);
    }
  };

  // 관심 질병/수술 변경 요청
  const fetchChangeMedicals = async () => {
    try {
      console.log(
        '1111111111',
        medicals.map((medical) => medical.id)
      );
      const res = await axios.put(api.user.changeMedical(), {
        medicalList: medicals.map((medical) => medical.id),
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 공개, 비공개 변경 요청
  const fetchUpdateOpenStatus = async () => {
    try {
      const res = await axios.put(api.user.updateOpenStatus(), {
        open: isOpen,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 변경사항 반영하기 버튼 클릭시
  const handleSubmit = async () => {
    try {
      // 닉네임이 변경되었을 경우 변경요청
      if (newName !== name) await fetchChangeName();

      // 관심 질병/수술이 변경되었을 경우 변경요청
      if ([...medicalList] !== [...medicals]) await fetchChangeMedicals();

      // 공개/비공개 설정이 변경되었을 경우 변경요청
      if (open !== isOpen) await fetchUpdateOpenStatus();

      if (musicAutoPlay !== paperMusicAutoPlay)
        dispatch(updateAutoPlay(musicAutoPlay));

      navigate(`/profile/${uid}`);
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
              {nameOKMsg && <OKMsg>{nameOKMsg}</OKMsg>}
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
                  fetchCheckNameDuplicated();
                }}
              >
                중복 체크하기
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
            <FlexDiv
              height="auto"
              justify="start"
              padding="1em 0.2em"
              wrap="wrap"
            >
              {medicals?.map(({ id, name }) => (
                <MedicalBtn key={id} color="gray">
                  {name}
                </MedicalBtn>
              ))}
              <MedicalBtn
                onClick={() =>
                  navigate(`/profile/${uid}/medicals`, {
                    state: { uid, newName, medicals, isOpen },
                  })
                }
                color="gray700"
              >
                <img src="/assets/icons/edit.svg" alt="edit" />
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
                onChange={() => setIsOpen((prev) => !prev)}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </ToggleContainer>
        </ProfileConfigOptionBtn>

        <ProfileConfigOptionBtn
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>일기 음악 자동 재생 설정하기</span>
          <ToggleContainer>
            <ToggleText>
              {musicAutoPlay ? '자동 재생 켜기' : '자동 재생 끄기'}
            </ToggleText>
            <ToggleWrapper>
              <Toggle
                id="toggleAutoPlay"
                type="checkbox"
                onChange={() => setMusicAutoPlay((prev) => !prev)}
                checked={musicAutoPlay}
              />
              <ToggleLabel htmlFor="toggleAutoPlay" />
            </ToggleWrapper>
          </ToggleContainer>
        </ProfileConfigOptionBtn>

        <SubmitBtn
          radius="20px"
          height="3.5em"
          margin="0.5em 0 1.5em 0"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          저장하고 프로필로 돌아가기
        </SubmitBtn>
      </ProfileConfigContainer>
    </>
  );
};

export default ProfileConfigPage;
