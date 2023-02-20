import axios from 'axios';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from '../../../api/api';
import { getPaperDate, getTimeDifference } from '../../../utils/paperUtils';
import Modal from '../../Modal/Modal';
import BtnReport from '../BtnReport/BtnReport';
import DiaryTitle from '../DiaryTitle/DiaryTitle';
import LikeComment from '../LikeComment/LikeComment';
import PaperImageModal from '../PaperImageModal/PaperImageModal';
import PaperImages from '../PaperImages/PaperImages';
import { BoxContent, BoxLeft, BoxRight, BoxTop } from '../PaperItem/style';
import SymptomRating from '../SymptomRating/SymptomRating';
import {
  AudioPlayer,
  BoxBottemLeft,
  BoxBottomDetail,
  BoxPaperDetail,
  BoxTopAudio,
  SpanPaperDate,
} from './style';

function PaperItemDetail({ paperId, paper }) {
  const navigate = useNavigate();
  const {
    condition,
    uid,
    name,
    diaryId,
    title,
    symptomList,
    content,
    images,
    userStatus, // userStatus 0이면 내꺼, 다른 숫자면 다른 유저꺼
    myHeart,
    likeCount,
    commentCount,
    createdAt,
    date,
    musicURL,
    play,
  } = paper;

  // 이미지 크게 보기 모달
  const [showFullImage, setShowFullImage] = useState(false);
  const [clickedImgSrc, setClickedImgSrc] = useState(false);

  // 일기 삭제 함수
  const deletePaper = async (paperId) => {
    try {
      await axios.delete(api.paper.paperDetail(paperId));
      navigate('/home');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // 일기 삭제 모달
  const [paperDeleteModalOpen, setPaperDeleteModalOpen] = useState(false);
  // 일기 신고 모달
  const [paperReportModalOpen, setPaperReportModalOpen] = useState(false);

  return (
    <>
      <BoxPaperDetail
        color="light"
        radius="0 0 50px 50px"
        padding="0 1.5em 1.5em"
      >
        <BoxTop>
          <BoxLeft>
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${uid}`);
              }}
              src={`/assets/clovers/clover${condition}.svg`}
              alt=""
              width={'70px'}
              height={'70px'}
            />
            <span>프로필 보기</span>
          </BoxLeft>
          <BoxRight>
            <div>
              <div style={{ padding: '.5em .3em' }}>
                <p style={{ fontWeight: '700' }}>{name}</p>
              </div>
              <div>
                <DiaryTitle title={title} diaryId={diaryId} />
                <SpanPaperDate>{getPaperDate(date)}</SpanPaperDate>
              </div>
              <BoxTopAudio>
                {musicURL && (
                  <AudioPlayer
                    src={musicURL}
                    controls
                    controlsList="nodownload noplaybackrate"
                    autoPlay={play}
                  />
                )}
              </BoxTopAudio>
            </div>
            {userStatus !== 0 && (
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
          <SymptomRating symptomList={symptomList} />
          {content}
          <PaperImages
            images={images}
            setShowFullImage={setShowFullImage}
            setClickedImgSrc={setClickedImgSrc}
          />
        </BoxContent>
        <BoxBottomDetail userStatus={Boolean(!userStatus)}>
          <BoxBottemLeft>
            {Boolean(!userStatus) && (
              <>
                <FiEdit
                  onClick={() => {
                    navigate(`/paper/modify/${paperId}`, {
                      state: { diaryId: `${diaryId}` },
                    });
                  }}
                />
                <FiTrash2
                  onClick={() => {
                    setPaperDeleteModalOpen(true);
                  }}
                />
              </>
            )}
            <span style={{ fontSize: '14px' }}>
              {getTimeDifference(createdAt)}
            </span>
          </BoxBottemLeft>
          <LikeComment
            id={paperId}
            myHeart={myHeart}
            likeCount={likeCount}
            commentCount={commentCount}
          />
        </BoxBottomDetail>
      </BoxPaperDetail>
      {paperDeleteModalOpen && (
        <Modal
          type={'일기'}
          action={'삭제'}
          setModalOpen={setPaperDeleteModalOpen}
          apiFunc={() => deletePaper(paperId)}
        />
      )}
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
      {showFullImage && (
        <PaperImageModal
          clickedImgSrc={clickedImgSrc}
          setShowFullImage={setShowFullImage}
        />
      )}
    </>
  );
}

export default PaperItemDetail;
