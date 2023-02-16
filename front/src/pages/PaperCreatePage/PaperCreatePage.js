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
  TextBubble,
} from './style';
import PaperCreateHeader from '../../components/Paper/PaperCreateHeader/PaperCreateHeader';
import DiariesDropdown from '../../components/Paper/DiariesDropdown/DiariesDropdown';
import DateDropdown from '../../components/Paper/DateDropdown/DateDropdown';
import SymptomRating from '../../components/Paper/BoxSymptom/BoxSymptom';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import TextareaGray from '../../components/common/TextareaGray/TextareaGray';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import PreviewImage from '../../components/Paper/PreviewImage/PreviewImage';
import { Clover } from '../../components/common/Clover/Clover';
import {
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
} from '../../components/PickSymptom/style';
function PaperCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dateFixed = location.state.dateFixed;
  const { year, month, day } = location.state.info;
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
  const [isOpen, setIsOpen] = useState(true); // 공개.비공개 state
  const [symptoms, setSymptoms] = useState([]); // 증상받아오기
  const [scores, setScores] = useState([]); // 증상점수저장하는 State

  // 증상 수정 페이지에 넘길 정보
  const [infoToModifyPage, setInfoToModifyPage] = useState({});
  // API 처리부분
  // 사용자가 작성한 다이어리 정보 받아오기
  const getDiaries = async () => {
    try {
      const res = await axios.get(api.diary.getDiaries(), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setDiaries(res.data.data);
    } catch (res) {
      console.log('err', res.data);
    }
  };

  // 해당 다이어리의 정보 불러오기
  const getDiaryInfos = async () => {
    try {
      const res = await axios.get(api.diary.getDiaryInfo(diaryId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      setDiary(res.data.data);
      if (res.data.data) {
        setSymptoms(
          res.data.data.diaryHasSymptoms.map((item) => ({
            symptomId: item.symptomId,
            name: item.name,
          }))
        );
        setScores(Array(res.data.data.diaryHasSymptoms.length).fill(0));
      }
      setInfoToModifyPage({
        medicals: res.data.data.medicals,
        symptoms: res.data.data.diaryHasSymptoms,
        diaryId: diaryId,
        title: res.data.data.title,
        description: res.data.data.description,
        open: res.data.data.open,
        from: 'paper',
      });
    } catch (res) {
      console.log('err', res.data);
    }
  };

  useEffect(() => {
    getDiaries();
    if (diaryId !== '') {
      getDiaryInfos();
    }
  }, [diaryId]);

  useEffect(() => {
    setForm({
      year: year,
      month: month,
      day: day,
    });
  }, []);

  // 일기 작성 업로드 체크
  const validCheck = (e) => {
    if (symptoms.length !== 0) {
      handleUploadImage();
    } else {
      alert('일기장을 먼저 선택해주세요');
    }
  };

  // 증상 추가 업로드 체크
  const validSymptomCheck = (e) => {
    if (symptoms.length !== 0) {
      navigate(`/diary/${diaryId}/modify/symptom`, {
        state: infoToModifyPage,
      });
    } else {
      alert('일기장을 먼저 선택해주세요');
    }
  };
  // 이미지 서버에 업로드 시키기
  // multipart 업로드
  const handleUploadImage = async () => {
    const data = new FormData();
    const calendar = form.year + '-' + form.month + '-' + form.day;

    const symptomScore = symptoms.map((item, index) => ({
      symptomId: item.symptomId,
      score: scores[index],
    }));

    data.append('diaryId', diaryId);
    data.append('contents', value);
    data.append('open', isOpen);
    data.append('date', calendar);

    for (let i = 0; i < files.length; i++) {
      const blob = await new Blob([files[i]], { type: files[i].type });
      data.append(`images[${i}]`, blob, files[i].name);
    }

    for (let i = 0; i < symptomScore.length; i++) {
      data.append(`symptoms[${i}].symptomId`, symptomScore[i].symptomId);
      data.append(`symptoms[${i}].score`, symptomScore[i].score);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post(api.paper.paperWrite(), data, config);
      const id = res.data.data;
      alert('일기가 성공적으로 등록되었습니다');
      navigate(`/paper/${id}`);
    } catch (err) {
      console.error('err', err);
      if (err.response.status === 409) {
        alert('이미 작성된 날짜입니다.');
        navigate(-1);
      }
    }
  };

  // 이미지 화면상에 업로드하기
  const handleSelectImage = (e) => {
    const newFiles = [...e.target.files];
    if (files.length + newFiles.length <= 3) {
      setFiles([...files, ...newFiles]);
    } else {
      alert('이미지는 최대 3개까지만 업로드 가능합니다');
    }
  };

  // 이미지 삭제하기
  const handleRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  console.log('diaries', diaries);
  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      {diaries?.length === 0 ? (
        <>
          <BoxPaperDetail>
            <PaperCreateHeader />
            <DiariesDropdown
              isdisabled={true}
              value={diaryId}
              state={setDiaryId}
              diaries={diaries}
            />
            <DateDropdown
              selectYear={year}
              selectMonth={month}
              selectDay={day}
              value={form}
              state={setForm}
              isdisabled={true}
            />
          </BoxPaperDetail>

          <FlexDiv direction={'column'} padding={'5em'}>
            <TextBubble>
              <p>아직 만들어진 일기장이 없어요</p>
            </TextBubble>
            <div>
              <Clover code={'1'} width={'150'} height={'150'} />
            </div>
          </FlexDiv>
        </>
      ) : (
        <>
          <BoxPaperDetail>
            <PaperCreateHeader />
            <DiariesDropdown
              isdisabled={false}
              value={diaryId}
              state={setDiaryId}
              diaries={diaries}
            />
            <DateDropdown
              selectYear={year}
              selectMonth={month}
              selectDay={day}
              value={form}
              state={setForm}
              isdisabled={dateFixed}
            />
          </BoxPaperDetail>
          <TopDiv>
            <ContentLabel>증상을 체크해주세요.</ContentLabel>
          </TopDiv>
          <BoxContent>
            <SymptomRating
              symptomList={diary.diaryHasSymptoms}
              values={scores}
              state={setScores}
            />
          </BoxContent>
          <RightDiv>
            <FiArrowRight />
            <ContentLabel
              margin="1em 2em 1em 0.3em"
              onClick={validSymptomCheck}
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
            <ContentLabel margin={'1.5em 1em 1.5em 2em'}>
              {' '}
              일기 공개 범위
            </ContentLabel>
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
            <BtnUpdate onClick={validCheck}>일기쓰기</BtnUpdate>
          </FlexDiv>
        </>
      )}
    </>
  );
}

export default PaperCreatePage;
