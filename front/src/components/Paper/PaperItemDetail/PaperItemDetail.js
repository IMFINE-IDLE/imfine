import axios from 'axios';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from '../../../api/api';
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
    musicURL,
  } = paper;

  // 이미지 크게 보기 모달
  const [showFullImage, setShowFullImage] = useState(false);
  const [clickedImgSrc, setClickedImgSrc] = useState(false);

  // 일기 삭제 함수
  const deletePaper = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperDetail(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      navigate('/home');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // 일기 삭제 모달
  const [paperDeleteModalOpen, setPaperDeleteModalOpen] = useState(false);
  // 일기 신고 모달
  const [paperReportModalOpen, setPaperReportModalOpen] = useState(false);

  // 게시글 시간 표시 함수
  function getTimeDifference(timeString) {
    let currentTime = new Date();
    let providedTime = new Date(createdAt);
    let milli = currentTime.getTime() - providedTime.getTime();
    let timeGap = parseInt(milli / 60000);
    // console.log(paperId, timeGap);

    if (timeGap < 60) {
      return `${timeGap}분전`;
    } else if (timeGap >= 60 && timeGap < 60 * 24) {
      return `${parseInt(timeGap / 60)}시간전`;
    } else if (timeGap >= 60 * 24) {
      if (currentTime.getFullYear() - providedTime.getFullYear()) {
        return `${providedTime.getFullYear()}년 ${
          providedTime.getMonth() + 1
        }월 ${providedTime.getDate()}일`;
      } else {
        return `${providedTime.getMonth() + 1}월 ${providedTime.getDate()}일`;
      }
    }
  }

  // console.log(diaryId);

  return (
    <>
      <BoxPaperDetail color="light" radius="0 0 50px 50px" padding="1.5em">
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
              </div>
              <BoxTopAudio>
                {musicURL && (
                  <AudioPlayer
                    src={musicURL}
                    controls
                    controlsList="nodownload noplaybackrate"
                    // onPlay={handlePlay}
                    // onPause={handlePause}
                  />
                )}
                {/* {isPlaying ? <p>Playing...</p> : <p>Paused</p>} */}
              </BoxTopAudio>
            </div>
            <BtnReport
              paperId={paperId}
              apiFunc={() => {
                setPaperReportModalOpen(true);
              }}
            />
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
                    navigate('/paper/create');
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
