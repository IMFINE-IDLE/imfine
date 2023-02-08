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
import { BoxContent, BoxLeft, BoxRight, BoxTop } from '../PaperItem/style';
import SymptomRating from '../SymptomRating/SymptomRating';
import { BoxBottemLeft, BoxBottomDetail, BoxPaperDetail } from './style';

function PaperItemDetail({ paperId, paper, likePaper, likePaperDelete }) {
  const navigate = useNavigate();
  const {
    condition,
    name,
    title,
    symptomList,
    content,
    images,
    userStatus, // userStatus 0이면 내꺼, 다른 숫자면 다른 유저꺼
    myHeart,
    likeCount,
    commentCount,
    createdAt,
  } = paper;

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
  const [modalOpen, setModalOpen] = useState(false);
  console.log(symptomList);

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

  return (
    <>
      <BoxPaperDetail color="light" radius="0 0 50px 50px" padding="1.5em">
        <BoxTop>
          <BoxLeft>
            <img
              src={`/assets/clovers/clover${condition}.svg`}
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
              <div>
                <DiaryTitle title={title} />
              </div>
            </div>
            <BtnReport paperId={paperId} />
          </BoxRight>
        </BoxTop>
        <BoxContent>
          <SymptomRating symptomList={symptomList} />
          {content}
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
                    setModalOpen(true);
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
            like={likePaper}
            likeDelete={likePaperDelete}
          />
        </BoxBottomDetail>
      </BoxPaperDetail>
      {modalOpen && (
        <Modal
          type={'일기'}
          action={'삭제'}
          setModalOpen={setModalOpen}
          apiFunc={() => deletePaper(paperId)}
        />
      )}
    </>
  );
}

export default PaperItemDetail;
