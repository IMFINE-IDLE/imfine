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

const DiaryModifyPage = () => {
  /*
   * Hooks
   */
  // 임시. 나중에 앞 페이지에서 받아올 것
  const [diaryInfo, setDiaryInfo] = useState({
    title: '기존 일기장 제목',
    description: '기존 일기장 설명',
  });
  const medicals = [{ id: 1, name: '질병명' }];
  const symptoms = [
    { id: 1, name: '증상1' },
    { id: 2, name: '증상2' },
  ];
  const [isOpen, setIsOpen] = useState(true);
  // 임시

  const { diaryId } = useParams();
  // const { title, description, medicals, diaryHasSymptoms, open } =
  //   useLocation().state;
  // const [diaryInfo, setDiaryInfo] = useState({
  //   title,
  //   description,
  // });
  // const [symptoms, setSymptoms] = useState(diaryHasSymptoms);
  // const [isOpen, setIsOpen] = useState(open);

  const [diaryDeleteModalOpen, setdiaryDeleteModalOpen] = useState(false);
  const [symptomDeleteModalOpen, setSymptomDeleteModalOpen] = useState(false);
  const [symptomToDelete, setSymptomToDelete] = useState(null);
  const navigate = useNavigate();

  /*
   * Functions
   */
  // 일기장 수정 요청
  const fetchUpdateDiary = () => {};

  // 일기장 삭제 요청
  const fetchDeleteDiary = () => {};

  // 증상 기록 삭제 요청
  const fetchDeleteSymptomRecord = () => {
    // symptomToDelete 에 저장된 증상을 지운다
  };

  // 입력값을 diaryInfo state에 저장
  const handleDiaryInfoChange = (e) => {
    console.log(e.target.name);
    setDiaryInfo({
      ...diaryInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 증상 삭제 클릭시 확인 모달 띄우기
  const handleDeleteAllRecord = (id, name) => {
    setSymptomDeleteModalOpen(true);
    setSymptomToDelete({ id, name });
  };

  return (
    <>
      <NavBarBasic Back={true} Text="일기장 수정" BackgroundColor={'main'} />

      <DiaryBoxGrad radius="0" padding="2em">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchUpdateDiary();
          }}
        >
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
                onClick={() => navigate(`/diary/${diaryId}/modify/symptom`)}
                style={{ fontColor: 'var(--icon-color)', fontSize: '0.9em' }}
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
              type="submit"
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
