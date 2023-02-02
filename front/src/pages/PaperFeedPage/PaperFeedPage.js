import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import Paper from '../../components/Paper/Paper';
import TabBar from '../../components/TabBar/TabBar';
import { BoxPaperFeed, Circle } from './style';
import { res } from './tmp';

function PaperFeedPage() {
  // const accessToken = useSelector((state) => {
  //   return state.accessToken;
  // });
  const [paperList, setPaperList] = useState([]);
  useEffect(() => {
    //   const fetchPaperFeed = async () => {
    //     try {
    //       const res = await axios.get(api.paper.paperFeed(), {
    //         headers: { 'X-AUTH-TOKEN': accessToken },
    //         headers: { 'X-AUTH-TOKEN': localStorage.getItem('accessToken') },
    //       });
    //       console.log(res.data);
    //       setPaperList(res.data.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   fetchPaperFeed();

    setPaperList(res.data);
  }, []);

  return (
    <>
      <NavBarBasic />
      <BoxPaperFeed>
        {paperList.map((paper) => {
          return <Paper paper={paper} key={paper.paperId} />;
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
