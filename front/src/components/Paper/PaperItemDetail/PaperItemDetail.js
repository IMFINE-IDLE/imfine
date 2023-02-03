import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import BtnReport from '../BtnReport/BtnReport';
import DiaryTitle from '../DiaryTitle/DiaryTitle';
import LikeComment from '../LikeComment/LikeComment';
import {
  BoxBottom,
  BoxContent,
  BoxLeft,
  BoxRight,
  BoxTop,
} from '../PaperItem/style';
import { BoxPaperDetail } from './style';

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
      <BoxBottom isMine>
        <div>
          {isMine && (
            <div>
              <FiEdit
                style={{ marginRight: '.5em', cursor: 'pointer' }}
                onClick={() => {
                  navigate('/paper/create');
                }}
              />
              <FiTrash2 />
            </div>
          )}
        </div>

        <LikeComment likeCount={likeCount} commentCount={commentCount} />
      </BoxBottom>
    </BoxPaperDetail>
  );
}

export default PaperItemDetail;
