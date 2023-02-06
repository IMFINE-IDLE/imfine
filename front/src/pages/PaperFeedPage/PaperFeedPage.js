import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import PaperItem from '../../components/Paper/PaperItem/PaperItem';
import TabBar from '../../components/TabBar/TabBar';
import { BoxPaperFeed, Circle } from './style';
import { res } from './tmp';

function PaperFeedPage() {
  const accessToken = useSelector((state) => {
    return state.accessToken;
  });
  const [paperList, setPaperList] = useState([]);

  const fetchPaperFeed = async () => {
    try {
      const res = await axios.get(api.paper.paperFeed(), {
        // headers: {
        //   Authorization: accessToken,
        // },
        // headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res.data);
      setPaperList(res.data.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchPaperFeed();

    // setPaperList(res.data);
  }, []);

  const likePaper = async (paperId) => {
    try {
      const res = await axios.post(
        api.paper.paperLikePost(),
        {
          contentId: paperId,
        },
        {
          headers: { Authorization: localStorage.getItem('accessToken') },
        }
      );
      console.log(res);
      fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const likePaperDelete = async (paperId) => {
    try {
      const res = await axios.delete(api.paper.paperLikeDelete(paperId), {
        headers: { Authorization: localStorage.getItem('accessToken') },
      });
      console.log(res);
      fetchPaperFeed();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <NavBarBasic />
      <BoxPaperFeed>
        {paperList?.map((paper) => {
          return (
            <PaperItem
              paper={paper}
              key={paper.paperId}
              myHeart={paper.myHeart}
              likeCount={paper.likeCount}
              likePaper={likePaper}
              likePaperDelete={likePaperDelete}
            />
          );
        })}
        <BtnFloat />
        <Circle small />
        <Circle />
      </BoxPaperFeed>
      <TabBar />
    </>
  );
}

export default PaperFeedPage;
