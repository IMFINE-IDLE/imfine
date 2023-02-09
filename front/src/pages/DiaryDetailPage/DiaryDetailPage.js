import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import StatusCalendar from '../../components/StatusCalendar/StatusCalendar';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
import { DiaryBoxGrad } from '../DiaryCreatePage/style';
import { DiaryInfoContainer, DiaryDateSpan } from './style';
import DiaryTitle from '../../components/Paper/DiaryTitle/DiaryTitle';
import { ReactComponent as BookmarkSvg } from './bookmark.svg';
import PickedItemList from '../../components/PickedItemList/PickedItemList';
import SymptomGraph from '../../components/SymptomGraph/SymptomGraph';
import { axiosInstance } from '../../api/axiosInstance';
import moment from 'moment';

const DiaryDetailPage = () => {
  const { diaryId } = useParams();
  const [diaryInfo, setDiaryInfo] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [isMine, setIsMine] = useState(null);

  // 일기장 정보 가져오기
  const fetchGetDiaryInfo = async () => {
    try {
      const res = await axios.get(api.diary.getDiaryInfo(diaryId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });

      // 내가 쓴 다이어리면 isMine = ture 로 변경
      if (res.data.data.uid === localStorage.getItem('uid')) {
        setIsMine(true);
      }

      console.log(res.data.data);
      setDiaryInfo(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchGetDiaryPaperItem = async (diaryId, date) => {
  //   try {
  //     const params = {
  //       diaryId,
  //       date: moment(date).format('YYYY-MM-DD'),
  //     };

  //     const res = await axiosInstance.get(api.diary.getDiaryPaperItem(params));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // 해당 일기장 구독 설정 및 해제
  const fetchUpdateSubscribeStatus = async (status) => {
    try {
      const fetchUrl = status
        ? api.diary.deleteDiarySubscribe()
        : api.diary.setDiarySubscribe(status);
      const method = status ? 'delete' : 'post';
      const res = await axios({
        url: fetchUrl,
        method: method,
        data: { diaryId: diaryId },
        headers: {
          Authorization: localStorage.getItem('accessToken'),
        },
      });

      console.log('bookmark', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGetDiaryInfo();
  }, []);

  if (!diaryInfo) return null;

  return (
    <>
      <NavBarBasic Back={true} />
      <DiaryBoxGrad radius="0">
        <DiaryInfoContainer radius="25px">
          <FlexDiv justify="space-between">
            <DiaryTitle title={diaryInfo.title} />
            <FlexDiv width="4em" justify="space-between">
              {isMine ? (
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  style={{ padding: '0.8125em 0' }}
                />
              ) : (
                <BookmarkSvg
                  onClick={(e) => {
                    e.preventDefault();
                    fetchUpdateSubscribeStatus(diaryInfo.subscribe);
                    // setDiaryInfo({subscribe} => !prev.subscribe);
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
              )}
              <img src="/assets/icons/more-vertical.svg" alt="more" />
            </FlexDiv>
          </FlexDiv>
          <FlexDiv direction="column">
            <PickedItemList
              title="작성자"
              isIcon={false}
              type="text"
              text={diaryInfo.name}
            />
            <PickedItemList
              title="질병/수술"
              isIcon={true}
              type="medical"
              medicals={diaryInfo.medicalList}
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
            {/* <FlexDiv width="50%"> */}
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
          {/* <FlexDiv>{diaryInfo.description}</FlexDiv> */}
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

        <StatusCalendar uid={diaryInfo.uid} diaryId={diaryId} />
      </DiaryBoxGrad>
    </>
  );
};

export default DiaryDetailPage;

// 더미데이터
// const medicalList = [
//   {
//     id: 1,
//     name: `코로나`,
//   },
// ];
// const diaryHasSymptoms = [
//   {
//     id: 16,
//     name: '두통',
//   },
//   {
//     id: 17,
//     name: '어지러움',
//   },
//   {
//     id: 18,
//     name: '어지러움',
//   },
//   {
//     id: 19,
//     name: '어지러움',
//   },
//   {
//     id: 14,
//     name: '어지러움',
//   },
//   {
//     id: 15,
//     name: '어지러움',
//   },
// ];
