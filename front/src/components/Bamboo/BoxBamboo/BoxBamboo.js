import React, { useState, useEffect } from 'react';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import BoxBambooFeed from '../BoxBambooFeed/BoxBambooFeed';
import axios from 'axios';
import api from '../../../api/api';

function BoxBamboo({ res }) {
  console.log(res);
  const [bambooList, setBambooList] = useState([]);
  // 대나무 좋아요 post
  const likeBamboo = async (bambooId) => {
    try {
      const res = await axios.post(
        api.bamboo.postBambooLike(bambooId),
        {
          contentId: bambooId,
        },
        {
          headers: { Authorization: localStorage.getItem('accessToken') },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // 대나무 좋아요 취소 delete
  const removeLikeBamboo = async (bambooId) => {
    try {
      const res = await axios.delete(api.bamboo.deleteBambooLike(bambooId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
    } catch (err) {
      console.log(err.repsonse.data);
    }
  };

  useEffect(() => {
    setBambooList(res.data);
  }, [res.data]);

  if (res) {
    return (
      <FlexDiv direction={'column'}>
        {bambooList &&
          bambooList.map((bamboo) => {
            return (
              <BoxBambooFeed
                bamboo={bamboo}
                likeBamboo={likeBamboo}
                removeLikeBamboo={removeLikeBamboo}
                key={bamboo.bambooId}
              />
            );
          })}
      </FlexDiv>
    );
  } else {
    return <FlexDiv direction={'column'}>심어진 대나무가 없어요!</FlexDiv>;
  }
}

export default BoxBamboo;
