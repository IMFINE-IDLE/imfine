import React, { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTimeDifference } from '../../../utils/paperUtils';
import Modal from '../../Modal/Modal';
import BtnReport from '../BtnReport/BtnReport';
import DiaryTitle from '../DiaryTitle/DiaryTitle';
import LikeComment from '../LikeComment/LikeComment';
import {
  BoxBottom,
  BoxPaper,
  BoxTop,
  BoxRight,
  BoxLeft,
  BoxContent,
  SpanDate,
  BoxSymptomList,
  IconSymptom,
} from './style';

function PaperItem({ paper }) {
  const userId = useSelector((state) => {
    return state.user.uid;
  });

  const navigate = useNavigate();
  const {
    paperId,
    uid,
    name,
    condition,
    title,
    content,
    likeCount,
    commentCount,
    createdAt,
    image,
    symptomList,
    myHeart,
    medicalName,
  } = paper;

  // 내 게시글인지 여부
  const isMine = Boolean(uid === userId);

  // 일기 신고 모달
  const [paperReportModalOpen, setPaperReportModalOpen] = useState(false);

  return (
    <>
      <BoxPaper onClick={() => navigate(`/paper/${paperId}`)}>
        <BoxTop>
          <BoxLeft>
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${uid}`);
              }}
              src={
                condition !== null
                  ? `/assets/clovers/clover${condition}.svg`
                  : '/assets/clovers/clover-1.svg'
              }
              alt=""
              width={'50px'}
              height={'50px'}
            />
          </BoxLeft>
          <BoxRight>
            <div>
              <div style={{ padding: '.5em .3em' }}>
                <p style={{ fontWeight: '700' }}>{name}</p>
              </div>
              <BoxSymptomList>
                <IconSymptom medical>{medicalName}</IconSymptom>
                {symptomList?.map(({ symptomId, symptomName, score }) => {
                  return (
                    <IconSymptom key={symptomId}>
                      {symptomName} {score}
                    </IconSymptom>
                  );
                })}
              </BoxSymptomList>
            </div>
            {!isMine && (
              <BtnReport
                paperId={paperId}
                apiFunc={() => {
                  setPaperReportModalOpen(true);
                }}
              />
            )}
          </BoxRight>
        </BoxTop>
        <BoxContent>
          {content}
          {image ? (
            <FiImage
              size=".9rem"
              style={{ margin: '-0.1em 0 0 0.3em', color: '#A9D7D0' }}
            />
          ) : null}
        </BoxContent>
        <BoxBottom>
          <div>
            <DiaryTitle title={title} shownOnMainFeed />
            <SpanDate>{getTimeDifference(createdAt)}</SpanDate>
          </div>
          <LikeComment
            id={paperId}
            myHeart={myHeart}
            likeCount={likeCount}
            commentCount={commentCount}
          />
        </BoxBottom>
      </BoxPaper>
      {paperReportModalOpen && (
        <Modal
          type={'일기'}
          action={'신고'}
          setModalOpen={setPaperReportModalOpen}
          apiFunc={() =>
            navigate('/report', {
              state: { id: paperId, type: 'Paper' },
            })
          }
        />
      )}
    </>
  );
}

export default PaperItem;
