import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import { BoxSymptom, BoxToggle } from '../../components/PickSymptom/style';
import { SubmitBtn } from '../ChangeName/style';
import {
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from '../ProfileConfigPage/style';
import {
  DiaryBoxGrad,
  DiaryCreateTitleText,
  DiaryCreateInput,
  DiaryCreateTextarea,
  DiaryCreateTitleSmall,
  DiaryCreateBtnSymptom,
} from './style';

function DiaryCreatePage() {
  // 임시. 나중에 앞 페이지에서 프롭스로 받아올 것
  // const {medicalPick, symptomPickList} = useLocation();
  const medicalPick = { id: 1, name: '질병명' };
  const symptomPickList = [
    { id: 1, name: '증상1' },
    { id: 2, name: '증상2' },
  ];

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [diaryInfo, setDiaryInfo] = useState({
    title: '',
    description: '',
  });
  const [isOpen, setIsOpen] = useState(true);

  const fetchPostDiary = async () => {
    try {
      const res = await axios.post(
        api.diary.postDiary(),
        {
          medicalId: medicalPick.id,
          open: isOpen,
          title: diaryInfo.title,
          description: diaryInfo.description,
          image: '1',
          symptom: symptomPickList.map((symptom) => symptom.id),
        },
        { headers: { Authorization: localStorage.getItem('accessToken') } }
      );

      navigate(`/diary/${res.data.data}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDiaryInfoChange = (e) => {
    console.log(e.target.name);
    setDiaryInfo({
      ...diaryInfo,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   console.log({
  //     medicalId: medicalPick.id,
  //     open: isOpen,
  //     title: diaryInfo.title,
  //     description: diaryInfo.description,
  //     image: '1',
  //     symptom: symptomPickList.map((symptom) => symptom.id),
  //   });
  // }, [diaryInfo]);

  return (
    <>
      <NavBarBasic Back={true} Text="일기장 생성" />
      <DiaryBoxGrad radius="0" padding="2em">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchPostDiary();
          }}
        >
          <DiaryCreateTitleText>
            일기장 제목을 입력해주세요
          </DiaryCreateTitleText>
          <DiaryCreateInput
            name="title"
            maxLength={20}
            required
            onChange={handleDiaryInfoChange}
          />
          <DiaryCreateTitleText>
            일기장 설명을 입력해주세요
          </DiaryCreateTitleText>
          <DiaryCreateTextarea
            name="description"
            maxLength={100}
            onChange={handleDiaryInfoChange}
          ></DiaryCreateTextarea>
          <BoxSymptom>
            <DiaryCreateTitleSmall>
              질병/수술 &nbsp; | &nbsp;
            </DiaryCreateTitleSmall>
            <DiaryCreateBtnSymptom>{medicalPick.name}</DiaryCreateBtnSymptom>
          </BoxSymptom>
          <BoxSymptom>
            <DiaryCreateTitleSmall>증상 &nbsp; | &nbsp;</DiaryCreateTitleSmall>
            {symptomPickList.map((symptom) => (
              <DiaryCreateBtnSymptom color="light-pink" key={symptom.id}>
                {symptom.name}
              </DiaryCreateBtnSymptom>
            ))}
          </BoxSymptom>
          <BoxToggle>
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
          </BoxToggle>
          <SubmitBtn
            radius="20px"
            height="3.5em"
            margin="4em 0 0 0"
            type="submit"
          >
            새 일기장 만들기
          </SubmitBtn>
        </form>
      </DiaryBoxGrad>
    </>
  );
}

export default DiaryCreatePage;
