import axios from 'axios';
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from '../../../api/api';
import BtnReport from '../BtnReport/BtnReport';
import DiaryTitle from '../DiaryTitle/DiaryTitle';
import LikeComment from '../LikeComment/LikeComment';
import { BoxContent, BoxLeft, BoxRight, BoxTop } from '../PaperItem/style';
import { BoxBottomDetail, BoxPaperDetail } from './style';

function PaperItemDetail({
  isMine,
  paperId,
  condition,
  name,
  title,
  content,
  images,
  likeCount,
  commentCount,
}) {
  const navigate = useNavigate();
  // const token = useSelector((state) => state.user.accessToken);
  // const token = localStorage.getItem('accessToken');

  // 일기 삭제 함수
  const deletePaper = async () => {
    // try {
    //   const res = await axios.delete(api.paper.paperDetail(), {
    //     headers: { 'X-AUTH-TOKEN': token },
    //   });
    // } catch (err) {
    //   console.log(err);
    //   console.log(err.response.data.message);
    // }
  };

  // 일기 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);

  return (
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
      <BoxContent>{content}</BoxContent>
      <BoxBottomDetail isMine>
        <div>
          {isMine && (
            <div>
              <FiEdit
                style={{ marginRight: '.5em' }}
                onClick={() => {
                  navigate('/paper/create');
                }}
              />
              <FiTrash2
                onClick={() => {
                  deletePaper(paperId);
                }}
              />
            </div>
          )}
        </div>

        <LikeComment likeCount={likeCount} commentCount={commentCount} />
      </BoxBottomDetail>
    </BoxPaperDetail>
  );
}

export default PaperItemDetail;
