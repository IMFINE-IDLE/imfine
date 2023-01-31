import React from 'react';
import BtnFloat from '../../components/BtnFloat/BtnFloat';
import NavBarBasic from '../../components/NavBarBasic/NavBarBasic';
import Paper from '../../components/Paper/Paper';
import TabBar from '../../components/TabBar/TabBar';
import { BoxPaperFeed } from './style';

function PaperFeedPage() {
  return (
    <>
      <NavBarBasic />
      <BoxPaperFeed>
        <Paper />
        <BtnFloat />
        <TabBar />
      </BoxPaperFeed>
    </>
  );
}

export default PaperFeedPage;
