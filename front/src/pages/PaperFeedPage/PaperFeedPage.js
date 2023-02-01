import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import Paper from '../../components/Paper/Paper';
import TabBar from '../../components/TabBar/TabBar';
import { BoxPaperFeed } from './style';
import { res } from './tmp';

function PaperFeedPage() {
  const [paperList, setPaperList] = useState([]);
  useEffect(() => {
    // const fetchPaperFeed = async () => {
    //   try {
    //     const res = await axios.get(api.paper.paperFeed());
    //     setPaperList(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchPaperFeed()

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
        <TabBar />
      </BoxPaperFeed>
    </>
  );
}

export default PaperFeedPage;
