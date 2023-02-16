import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import Modal from '../../../components/Modal/Modal';
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
} from '../DiaryCreateConfirmPage/style';
import axios from 'axios';
import api from '../../../api/api';

const DiaryModifyPage = () => {
  /*
   * Hooks
   */
  const { diaryId } = useParams();
  const { title, description, medicals, diaryHasSymptoms, open, symptomAdded } =
    useLocation().state;
  // 증상 추가 화면 재활용을 위한 값 추가
  const from = 'diary';

  // 수정사항 반영을 위한 state
  const [diaryInfo, setDiaryInfo] = useState({
    title,
    description,
  });
  const [symptoms, setSymptoms] = useState(diaryHasSymptoms);
  const [isOpen, setIsOpen] = useState(open);

  // 삭제 확인 모달용 state
  const [diaryDeleteModalOpen, setdiaryDeleteModalOpen] = useState(false);
  const [symptomDeleteModalOpen, setSymptomDeleteModalOpen] = useState(false);
  const [symptomToDelete, setSymptomToDelete] = useState(null);

  const navigate = useNavigate();

  /*
   * Functions
   */
  // 일기장 수정 요청
  const fetchUpdateDiary = async () => {
    try {
      await axios.put(api.diary.postDiary(), {
        diaryId: diaryId,
        title: diaryInfo.title,
        description: diaryInfo.description,
        image: '1',
        open: isOpen,
        active: true,
      });

      // 증상 추가 페이지에 다녀왔다면 페이지 두 개분을 replace
      if (symptomAdded) navigate(-2, { replace: true });
      // 증상 추가 외 나머지 수정이면 그냥 이전으로 돌아가기
      navigate(-1, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  // 일기장 삭제 요청
  const fetchDeleteDiary = async () => {
    try {
      await axios.delete(api.diary.getDiaryInfo(diaryId));

      navigate('/diary', { state: { filter: false } });
    } catch (err) {
      console.error(err);
    }
  };

  // 증상 기록 삭제 요청
  const fetchDeleteSymptomRecord = async () => {
    // symptomToDelete 에 저장된 증상을 지운다
    try {
      await axios.delete(api.diary.deleteDiarySymptom(symptomToDelete.id));
      setSymptoms(
        symptoms.filter((symptom) => symptom.id !== symptomToDelete.id)
      );
      setSymptomDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 입력값을 diaryInfo state에 저장
  const handleDiaryInfoChange = (e) => {
    setDiaryInfo({
      ...diaryInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 증상 삭제 클릭시 확인 모달 띄우기
  const handleDeleteAllRecord = (id, name) => {
    setSymptomToDelete({ id, name });
    setSymptomDeleteModalOpen(true);
  };

  return (
    <>
      <NavBarBasic Back={true} Text="일기장 수정" BackgroundColor={'main'} />

      <DiaryBoxGrad radius="0" padding="2em">
        <form>
          <DiaryCreateTitleText>
            일기장 제목을 입력해주세요
          </DiaryCreateTitleText>
          <DiaryCreateInput
            name="title"
            value={diaryInfo.title}
            maxLength={20}
            required
            onChange={handleDiaryInfoChange}
          />
          <DiaryCreateTitleText>
            일기장 설명을 입력해주세요
          </DiaryCreateTitleText>
          <DiaryCreateTextarea
            name="description"
            value={diaryInfo.description}
            maxLength={100}
            onChange={handleDiaryInfoChange}
          ></DiaryCreateTextarea>

          <FlexDiv direction="column" padding="1em 0">
            <PickedItemList
              title="질병/수술"
              type="medical"
              medicals={medicals}
            />
            <PickedItemList
              title="증상"
              type="symptom"
              symptoms={symptoms}
              color="light-pink"
              canModify={true}
              deleteAllRecord={true}
              handleDeleteAllRecord={handleDeleteAllRecord}
            />
            <FlexDiv justify="end">
              <span
                onClick={() =>
                  navigate(`/diary/${diaryId}/modify/symptom`, {
                    state: {
                      medicals,
                      symptoms,
                      diaryId,
                      title,
                      description,
                      open,
                      from,
                    },
                  })
                }
                style={{
                  fontColor: 'var(--icon-color)',
                  fontSize: '0.9em',
                  cursor: 'pointer',
                }}
              >
                증상 추가하러 가기{' '}
              </span>
              <BsArrowRightShort />
            </FlexDiv>
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

          <FlexDiv
            direction="column"
            // style={{ position: 'absolute', bottom: '2.5em' }}
          >
            <SubmitBtn
              radius="20px"
              height="3.5em"
              margin="4em 0 0 0"
              onClick={(e) => {
                e.preventDefault();
                fetchUpdateDiary();
              }}
            >
              수정 완료
            </SubmitBtn>

            <span
              style={{
                color: 'var(--red-color)',
                paddingTop: '1em',
                cursor: 'pointer',
              }}
              onClick={() => setdiaryDeleteModalOpen(true)}
            >
              일기장 삭제
            </span>
          </FlexDiv>
        </form>
      </DiaryBoxGrad>

      {diaryDeleteModalOpen && (
        <Modal
          type={'일기장'}
          action={'삭제'}
          setModalOpen={setdiaryDeleteModalOpen}
          apiFunc={fetchDeleteDiary}
        />
      )}

      {symptomDeleteModalOpen && (
        <Modal
          type={'증상기록삭제'}
          setModalOpen={setSymptomDeleteModalOpen}
          apiFunc={fetchDeleteSymptomRecord}
        />
      )}
    </>
  );
};

export default DiaryModifyPage;
