import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import PickedItemList from '../../../components/PickedItemList/PickedItemList';
import { BoxToggle } from '../../../components/PickSymptom/style';
import {
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from '../../Profile/ProfileConfigPage/style';
import {
  DiaryBoxGrad,
  DiaryCreateTitleText,
  DiaryCreateInput,
  DiaryCreateTextarea,
  SubmitBtn,
} from './style';

function DiaryCreateConfirmPage() {
  const { medicalList, symptomList } = useLocation().state;

  const [diaryInfo, setDiaryInfo] = useState({
    title: '',
    description: '',
  });
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // 일기장 생성 요청
  const fetchPostDiary = async () => {
    try {
      const res = await axios.post(
        api.diary.postDiary(),
        {
          medicalId: medicalList[0].id,
          open: isOpen,
          title: diaryInfo.title,
          description: diaryInfo.description,
          image: '1',
          symptom: symptomList?.map((symptom) => symptom.id),
        }
        // { headers: { Authorization: localStorage.getItem('accessToken') } }
      );

      navigate(`/diary/${res.data.data}`);
    } catch (err) {
      console.error(err);
    }
  };

  // 입력값을 diaryInfo state에 저장
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
      <NavBarBasic Back={true} Text="일기장 생성" BackgroundColor={'main'} />
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

          <FlexDiv direction="column" padding="1em 0">
            <PickedItemList
              title="질병/수술"
              type="medical"
              medicals={medicalList}
            />
            <PickedItemList
              title="증상"
              type="symptom"
              symptoms={symptomList}
              color="light-pink"
            />
          </FlexDiv>

          {/* <img /> */}

          <BoxToggle>
            <span>일기장 공개/비공개 설정하기</span>
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

export default DiaryCreateConfirmPage;
