import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../../api/api';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import DiaryTitle from '../../../components/Paper/DiaryTitle/DiaryTitle';
import PickedItemList from '../../../components/PickedItemList/PickedItemList';
import SymptomGraph from '../../../components/SymptomGraph/SymptomGraph';
import StatusCalendar from '../../../components/StatusCalendar/StatusCalendar';
import { ReactComponent as BookmarkSvg } from './bookmark.svg';
import { BoxShad } from '../../../components/common/BoxShad/BoxShad';
import { FlexDiv } from '../../../components/common/FlexDiv/FlexDiv';
import { DiaryBoxGrad } from '../DiaryCreateConfirmPage/style';
import { DiaryInfoContainer, DiaryDateSpan, DiaryReportBtn } from './style';

const DiaryDetailPage = () => {
  const { diaryId } = useParams();
  const [diaryInfo, setDiaryInfo] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const navigate = useNavigate();

  // 내 일기장인지 여부 확인
  const isMine = Boolean(
    diaryInfo?.uid === useSelector((state) => state.user.uid)
  );

  // 일기장 상세정보 가져오기
  const fetchGetDiaryInfo = async () => {
    try {
      const res = await axios.get(api.diary.getDiaryInfo(diaryId));

      console.log(res.data.data);
      setDiaryInfo(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 일기장 구독 상태 변경
  const fetchUpdateSubscribeStatus = async (status) => {
    try {
      // 구독중이면 구독 취소 요청
      if (status) {
        await axios.delete(api.diary.deleteDiarySubscribe(diaryId));
      }
      // 구독중이 아니면 구독 요청
      else {
        await axios.post(api.diary.setDiarySubscribe(), {
          diaryId,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetDiaryInfo();
  }, []);

  // 작성자 클릭시 해당 유저의 프로필로 이동
  const onClickUserName = () => {
    console.log(diaryInfo.uid);
    navigate(`/profile/${diaryInfo.uid}`);
  };

  if (!diaryInfo) return null;

  // 일기장 수정 페이지로 넘길 데이터
  const infoToModifyPage = {
    title: diaryInfo?.title,
    description: diaryInfo?.description,
    medicals: diaryInfo?.medicals,
    diaryHasSymptoms: diaryInfo?.diaryHasSymptoms,
    open: diaryInfo?.open,
  };

  // 테스트용 더미데이터
  // const infoToModifyPage = {
  //   title: 'diaryInfotitle',
  //   description: 'diaryInfodescription',
  //   medicals: [{ id: 1, name: '질병명' }],
  //   diaryHasSymptoms: [
  //     { id: 1, name: '증상1' },
  //     { id: 2, name: '증상2' },
  //   ],
  //   open: true,
  // };

  if (!diaryInfo) return null;

  return (
    <>
      <NavBarBasic Back={true} BackgroundColor="main" />
      <DiaryBoxGrad radius="0">
        <DiaryInfoContainer radius="25px">
          <FlexDiv justify="space-between">
            <DiaryTitle title={diaryInfo.title} />
            <FlexDiv width="4em" justify="end">
              {isMine ? (
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  style={{ padding: '0.8125em 0', cursor: 'pointer' }}
                  onClick={() =>
                    navigate(`/diary/${diaryId}/modify`, {
                      state: infoToModifyPage,
                    })
                  }
                />
              ) : (
                <FlexDiv justify="end" style={{ position: 'relative' }}>
                  <BookmarkSvg
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchUpdateSubscribeStatus(diaryInfo.subscribe);
                      setDiaryInfo((prev) => ({
                        ...prev,
                        subscribe: !{ ...prev }.subscribe,
                      }));
                    }}
                    fill={
                      diaryInfo.subscribe
                        ? 'var(--main-color)'
                        : 'var(--gray-color)'
                    }
                    stroke={
                      diaryInfo.subscribe
                        ? 'var(--main-color)'
                        : 'var(--gray800-color)'
                    }
                    style={{ position: 'relative', top: '-1.5px' }}
                  />
                  <img
                    onClick={(e) => {
                      e.preventDefault();
                      setReportOpen((prev) => !prev);
                    }}
                    src="/assets/icons/more-vertical.svg"
                    alt="more"
                  />
                  {reportOpen && (
                    <DiaryReportBtn
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/report', {
                          state: { id: diaryId, type: 'Diary' },
                        });
                      }}
                    >
                      신고하기
                    </DiaryReportBtn>
                  )}
                </FlexDiv>
              )}
            </FlexDiv>
          </FlexDiv>
          <FlexDiv direction="column">
            <PickedItemList
              title="작성자"
              isIcon={false}
              type="text"
              text={diaryInfo.name}
              onClickUserName={onClickUserName}
              textPointer={true}
            />
            <PickedItemList
              title="질병/수술"
              isIcon={true}
              type="medical"
              medicals={diaryInfo.medicals}
            />
            <PickedItemList
              title="증상"
              isIcon={true}
              type="symptom"
              symptoms={diaryInfo.diaryHasSymptoms}
              canModify={false}
              color="light-pink"
            />
          </FlexDiv>
          <FlexDiv>
            <DiaryDateSpan width="15%" bold={true}>
              시작일
            </DiaryDateSpan>
            <DiaryDateSpan width="35%">{diaryInfo.beginDate}</DiaryDateSpan>
            <DiaryDateSpan width="15%" bold={true}>
              종료일
            </DiaryDateSpan>
            <DiaryDateSpan width="35%">
              {diaryInfo.endDate || '-'}
            </DiaryDateSpan>
          </FlexDiv>
          <DiaryDateSpan textAlign="start" padding="0 0.2em">
            {diaryInfo.description || '일기장 설명이 없어요'}
          </DiaryDateSpan>
        </DiaryInfoContainer>

        <FlexDiv height="1.25em" justify="end" margin="1em 0 0.5em 0">
          <DiaryDateSpan
            onClick={() => setShowGraph((prev) => !prev)}
            pointer={true}
          >
            증상 추이 보기
            <img
              src={`/assets/icons/chevron-${showGraph ? 'up' : 'down'}.svg`}
              alt="show graph"
              style={{
                paddingLeft: '0.3em',
                position: 'relative',
                top: '-0.15em',
              }}
            />
          </DiaryDateSpan>
        </FlexDiv>
        {showGraph && (
          <BoxShad radius="25px" height="15em" margin="0 0 1.5em 0">
            <SymptomGraph />
          </BoxShad>
        )}

        <StatusCalendar
          uid={diaryInfo.uid}
          diaryId={diaryId}
          isProfile={false}
          isMine={isMine}
        />
      </DiaryBoxGrad>
    </>
  );
};

export default DiaryDetailPage;
