import axios from 'axios';
import api from '../../api/api';
import React, { useState, useEffect } from 'react';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import {
  BoxPaperDetail,
  BoxContent,
  TopDiv,
  ContentLabel,
  RightDiv,
  InputContainer,
  StyledInput,
  BtnUpdate,
} from './style';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
import DiariesDropdown from '../../components/Paper/DiariesDropdown/DiariesDropdown';
import DateDropdown from '../../components/Paper/DateDropdown/DateDropdown';
import SymptomRating from '../../components/Paper/SymptomRating/SymptomRating';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import TextareaGray from '../../components/common/TextareaGray/TextareaGray';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import PreviewImage from '../../components/Paper/PreviewImage/PreviewImage';
import {
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from '../../components/PickSymptom/style';
function PaperCreatePage() {
  const navigate = useNavigate();
  // 이미지 업로드 개수 3개까지 MAX
  const now = new Date();
  const [diaries, setDiaries] = useState([]); // dropdown에 나올 일기장 선택값들 저장
  const [diaryId, setDiaryId] = useState(''); // dropdown 선택 시 일기장 아이디값 저장
  const [diary, setDiary] = useState(''); // 일기장 상세정보
  const [value, setValue] = useState(''); // 일기내용
  // 날짜 저장하는 state 객체
  const [form, setForm] = useState({
    year: now.getFullYear(),
    month: '01',
    day: '01',
  });

  const [files, setFiles] = useState([]); // 이미지미리뵈기
  const [uploadedImage, setUploadedImage] = useState(null); // 이미지 서버 업로드
  const [isOpen, setIsOpen] = useState(true); // 공개.비공개 state
  const [symptoms, setSymptoms] = useState([]); // 증상받아오기

  // API 처리부분
  // 사용자가 작성한 다이어리 정보 받아오기
  const getDiaries = async () => {
    try {
      const res = await axios.get(api.diary.getDiaries(), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setDiaries(res.data.data);
      console.log('내가만든다이어리', res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };
  useEffect(() => {
    getDiaries();
  }, [diaryId]);

  console.log('selected diaryid', diaryId);
  console.log('file info: ', files);
  // 해당 다이어리의 정보 불러오기
  const getDiaryInfos = async () => {
    try {
      const res = await axios.get(api.diary.getDiaryInfo(diaryId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log('일기장 상세정보', res.data.data);
      setDiary(res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };

  useEffect(() => {
    if (diaryId != '') {
      getDiaryInfos();
    }
  }, [diaryId]);

  // 일기장 선택될때마다 해당 일기장 정보끌고오기
  useEffect(() => {
    setSymptoms(diary.diaryHasSymptoms);
    console.log('symptoms', symptoms);
  }, [diary]);

  // 이미지 서버에 업로드 시키기
  const handleUploadImage = () => {
    const data = new FormData();
    data.append('files[]', files);
    // multipart 업로드
  };

  // 이미지 화면상에 업로드하기
  const handleSelectImage = (e) => {
    const newFiles = [...e.target.files];
    if (files.length + newFiles.length <= 3) {
      setFiles([...files, ...newFiles]);
    } else {
      alert('You can only select up to 3 images');
    }
  };

  // 이미지 삭제하기
  const handleRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      <BoxPaperDetail>
        <PaperCreateHeader />
        <DiariesDropdown value={diaryId} state={setDiaryId} diaries={diaries} />
        <DateDropdown value={form} state={setForm} />
      </BoxPaperDetail>
      <TopDiv>
        <ContentLabel>증상을 체크해주세요.</ContentLabel>
      </TopDiv>
      <BoxContent>
        <SymptomRating symptomList={symptoms} />
      </BoxContent>
      <RightDiv>
        <FiArrowRight />
        <ContentLabel
          margin="1em 2em 1em 0.3em"
          onClick={() => navigate('/paper/symptom')}
        >
          {' '}
          증상 추가하러 가기
        </ContentLabel>
      </RightDiv>
      <TopDiv>
        <ContentLabel>일기 내용을 작성해주세요.</ContentLabel>
      </TopDiv>
      <FlexDiv>
        <TextareaGray
          width={'90%'}
          height={'7em'}
          margin={'1em'}
          value={value}
          setValue={setValue}
        />
      </FlexDiv>
      <TopDiv>
        <ContentLabel>사진 등록하기.</ContentLabel>
      </TopDiv>
      <FlexDiv direction="column" margin="0.3em 1.5em">
        <InputContainer>
          <StyledInput type="file" multiple onChange={handleSelectImage} />
          <FlexDiv>
            {files.map((file, index) => (
              <PreviewImage
                key={index}
                file={file}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </FlexDiv>
        </InputContainer>
      </FlexDiv>
      <FlexDiv direction="row" justify="flex-start">
        <ContentLabel> 일기 비공개 설정하기</ContentLabel>
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
      </FlexDiv>
      <FlexDiv>
        <BtnUpdate color={'gray'} onClick={() => navigate(-1)}>
          취소하기
        </BtnUpdate>
        <BtnUpdate onClick={handleUploadImage}>일기쓰기</BtnUpdate>
      </FlexDiv>
    </>
  );
}

export default PaperCreatePage;
