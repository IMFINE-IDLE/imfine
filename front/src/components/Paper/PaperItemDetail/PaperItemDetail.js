import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
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
  condition,
  name,
  title,
  content,
  images,
  likeCount,
  commentCount,
}) {
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
          <BtnReport />
        </BoxRight>
      </BoxTop>
      <BoxContent>{content}</BoxContent>
      <BoxBottom>
        <div>
          <FiEdit style={{ marginRight: '.5em' }} />
          <FiTrash2 />
        </div>
        <LikeComment likeCount={likeCount} commentCount={commentCount} />
      </BoxBottom>
    </BoxPaperDetail>
  );
}

export default PaperItemDetail;
