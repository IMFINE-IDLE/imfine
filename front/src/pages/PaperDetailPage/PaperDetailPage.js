import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import DiaryTitle from '../../components/Paper/DiaryTitle/DiaryTitle';
import LikeComment from '../../components/Paper/LikeComment/LikeComment';
import {
  BoxBottom,
  BoxContent,
  BoxLeft,
  BoxRight,
  BoxTop,
} from '../../components/Paper/PaperItem/style';
import { BoxPaperDetail } from './style';

function PaperDetailPage() {
  const { paperId } = useParams();
  // const [paper, setPaper] = useState(null);
  // useEffect(() => {
  //   const fetchPaperDetail = async () => {
  //     const res = await axios.get(api.paper.paperDetail(paperId));
  //     setPaper(res.data.data);
  //   };
  //   fetchPaperDetail();
  // }, []);

  return (
    <>
      <NavBarBasic Back />
      <BoxPaperDetail color="light" radius="0 0 50px 50px" padding="1.5em">
        <BoxTop>
          <BoxLeft>
            <img
              src={`/assets/clovers/clover${0}.svg`}
              alt=""
              width={'50px'}
              height={'50px'}
            />
          </BoxLeft>
          <BoxRight>
            <div style={{ padding: '.5em .3em' }}>
              <p style={{ fontWeight: '700' }}>닉네임</p>
            </div>
            <div>
              <DiaryTitle title={'나의 항암 일기'} />
            </div>
          </BoxRight>
        </BoxTop>
        <BoxContent>
          어떻게 하나요? 블라블라 Most fonts have a particular weight which
          corresponds to one of the numbers in Common weight name mapping.
          However some fonts, called variablethe chosen weight.
        </BoxContent>
        <BoxBottom>
          <div>
            <FiEdit style={{ marginRight: '.5em' }} />
            <FiTrash2 />
          </div>
          <LikeComment likeCount={0} commentCount={0} />
        </BoxBottom>
      </BoxPaperDetail>
    </>
  );
}

export default PaperDetailPage;
