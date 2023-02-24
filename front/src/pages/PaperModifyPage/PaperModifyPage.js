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
import ModifyBoxSymptom from '../../components/Paper/ModifyBoxSymptom/ModifyBoxSymptom';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
import DiaryInfo from '../../components/Diary/DiaryInfo/DiaryInfo';
import ModifyPreviewImage from '../../components/Paper/PreviewImage/ModifyPreviewImage';
function PaperModifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const diaryId = location.state.diaryId;
  console.log('dd', diaryId);
  const { paperId } = useParams();
  // 이미지 업로드 개수 3개까지 MAX
  const now = new Date();
  const [diaries, setDiaries] = useState([]); // dropdown에 나올 일기장 선택값들 저장
  //const [diaryId, setDiaryId] = useState(''); // dropdown 선택 시 일기장 아이디값 저장
  const [diary, setDiary] = useState(''); // 일기장 상세정보
  const [value, setValue] = useState(''); // 일기내용
  const [files, setFiles] = useState([]); // 이미지미리뵈기
  const [fileId, setFileId] = useState([]); // 이미지파일아이디 저장하는 값
  const [isOpen, setIsOpen] = useState(true); // 공개.비공개 state
  const [symptoms, setSymptoms] = useState([]); // 증상받아오기
  const [scores, setScores] = useState([]); // 증상점수저장하는 State

  // 이미지업로드관련
  const [original, setOriginal] = useState([]); // 원본이미지저장하기
  const [deleted, setDeleted] = useState([]); // 지워진 이미지. id값 넣어주어야
  const [updated, setUpdated] = useState([]); // multipartform으로 넣기

  // 날짜 저장하는 state 객체
  const [form, setForm] = useState({
    year: now.getFullYear(),
    month: '01',
    day: '01',
  });

  // 증상 수정 페이지에 넘길 정보
  const [infoToModifyPage, setInfoToModifyPage] = useState({});
  // 수정할 일기 정보 저장하는 useState();
  const [paperInfo, setPaperInfo] = useState([]);

  // API 처리부분
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

  // 해당 다이어리(일기장) 정보 불러오기
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
  // 일기 수정시 필요한 정보 받아오기
  const modifyPaperInfo = async () => {
    try {
      const res = await axios.get(api.paper.getPaperModifyInfo(paperId));
      console.log('일기장수정정보', res.data.data);
      setPaperInfo(res.data.data);
      setSymptoms(
        res.data.data.symptoms.map((item) => ({
          id: item.id,
          symptomId: item.symptomId,
          name: item.symptomName,
          score: item.score,
        }))
      );
      //setScores(Array(res.data.data.symptoms.length).fill(0));
      setScores(res.data.data.symptoms.map((item) => item.score));
      setValue(res.data.data.content);
      setFiles(
        res.data.data.images.map((item) => ({
          id: item.id,
          image: item.image,
        }))
      );
      setOriginal(
        res.data.data.images.map((item) => ({
          id: item.id,
          image: item.image,
        }))
      );
      const dates = res.data.data.date.split('-');
      setForm({
        year: dates[0],
        month: dates[1],
        day: dates[2],
      });
      setIsOpen(res.data.data.open);
      //setDiaryId(res.data.data.diaryId);
      // setInfoToModifyPage({
      //   medicals: res.data.data.medicals,
      //   diaryHasSymptoms: res.data.data.symptoms,
      //   diaryId: res.data.data.diaryId,
      //   title: res.data.data.title,
      //   description: res.data.data.description,
      //   open: res.data.data.open,
      //   from: 'paper',
      // });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getDiaries();
    modifyPaperInfo();
  }, []);

  useEffect(() => {
    getDiaryInfos();
  }, [diaries]);

  useEffect(() => {
    setInfoToModifyPage({
      medicals: diary.medicals,
      symptoms: diary.diaryHasSymptoms,
      diaryId: diaryId,
      title: diary.title,
      description: diary.description,
      open: diary.open,
      from: 'paper',
    });
  }, [diary]);

  // 일기 작성 업로드 체크
  const validCheck = (e) => {
    if (diaryId) {
      handleUploadImage();
    } else {
      alert('일기장을 먼저 선택해주세요');
    }
  };

  // 증상 추가 업로드 체크
  const validSymptomCheck = (e) => {
    navigate(`/diary/${diaryId}/modify/symptom`, {
      state: infoToModifyPage,
    });
  };
  // 이미지 서버에 업로드 시키기
  // 일기수정하기
  const handleUploadImage = async () => {
    const data = new FormData();
    const calendar = form.year + '-' + form.month + '-' + form.day;

    const symptomScore = symptoms.map((item, index) => ({
      id: item.id,
      symptomId: item.symptomId,
      score: scores[index],
    }));

    data.append('paperId', paperId);
    data.append('contents', value);
    data.append('open', isOpen);

    // for (let i = 0; i < files.length; i++) {
    //   const blob = await new Blob([files[i]], { type: files[i].type });
    //   data.append(`images[${i}]`, blob, files[i].name);
    // }

    for (let i = 0; i < updated.length; i++) {
      const blob = await new Blob([updated[i]], { type: updated[i].type });
      data.append(`putImages[${i}]`, blob, updated[i].name);
    }

    for (let i = 0; i < deleted.length; i++) {
      data.append(`removeImages[${i}]`, deleted[i]);
    }
    for (let i = 0; i < symptomScore.length; i++) {
      if (symptomScore[i].symptomId !== 0) {
        data.append(`symptomList[${i}].id`, symptomScore[i].id);
        data.append(`symptomList[${i}].symptomId`, symptomScore[i].symptomId);
        data.append(`symptomList[${i}].score`, symptomScore[i].score);
      } else {
        data.append(`symptomList[${i}].id`, symptomScore[i].id);
        data.append(`symptomList[${i}].score`, symptomScore[i].score);
      }
    }

    // (key: contents) value : 일기장내용
    // (key: open) isOpen: 공개/비공개 여부
    // (key: date) calendar: 날짜
    // (key: image) image 파일
    // symptomScore : 증상점수 업로드

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.put(api.paper.putPaper(), data, config);
      console.log('upload success', res);

      // 업로드성공하면 일기상세화면으로 넘어가야해용
      // 일단 알림
      alert('일기를 성공적으로 수정했습니다');
      navigate(-1, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  // 이미지 화면상에 업로드하기
  const handleSelectImage = (e) => {
    const newFiles = [...e.target.files];
    if (files.length + newFiles.length <= 3) {
      setUpdated([...updated, ...newFiles]);
      setFiles([...files, ...newFiles]);
    } else {
      alert('이미지는 최대 3개까지만 업로드 가능합니다');
    }
  };

  // 이미지 삭제하기
  const handleRemove = (index) => {
    if (files[index].image === original[index].image) {
      setDeleted([...deleted, files[index].id]);
    }
    if (updated) {
      setUpdated(updated.filter((item) => item.name !== files[index].name));
    }

    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 수정'}
        TextColor={'icon'}
      />
      <BoxPaperDetail>
        <PaperCreateHeader />
        <DiariesDropdown
          isdisabled={true}
          value={paperInfo.title}
          state={setDiaries}
          diaries={diaries}
        />
        <DateDropdown isdisabled={true} value={form} />
      </BoxPaperDetail>
      <TopDiv>
        <ContentLabel>증상을 체크해주세요</ContentLabel>
      </TopDiv>
      <BoxContent>
        <ModifyBoxSymptom
          symptomList={paperInfo.symptoms}
          values={scores}
          state={setScores}
        />
      </BoxContent>
      <RightDiv>
        <FiArrowRight />
        <ContentLabel margin="1em 2em 1em 0.3em" onClick={validSymptomCheck}>
          {' '}
          증상 추가하러 가기
        </ContentLabel>
      </RightDiv>
      <TopDiv>
        <ContentLabel>일기 내용을 작성해주세요</ContentLabel>
      </TopDiv>
      <FlexDiv>
        <TextareaGray
          width={'90%'}
          height={'7em'}
          margin={'1em'}
          value={value}
          setValue={setValue}
          maxLength={250}
        />
      </FlexDiv>
      <TopDiv>
        <ContentLabel>사진 등록하기</ContentLabel>
      </TopDiv>
      <FlexDiv direction="column">
        <InputContainer>
          <StyledInput type="file" multiple onChange={handleSelectImage} />
          <FlexDiv>
            {files.map((file, index) => (
              <ModifyPreviewImage
                key={index}
                file={file}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </FlexDiv>
        </InputContainer>
      </FlexDiv>
      <FlexDiv direction="row" justify="flex-start">
        <ContentLabel>일기 공개 범위</ContentLabel>
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
        <BtnUpdate onClick={validCheck}>일기수정</BtnUpdate>
      </FlexDiv>
    </>
  );
}

export default PaperModifyPage;
