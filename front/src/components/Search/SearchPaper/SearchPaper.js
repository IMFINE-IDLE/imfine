import React, { useState } from 'react';
import { BoxPaperFeed } from '../../../pages/PaperFeedPage/style';
import PaperItem from '../../Paper/PaperItem/PaperItem';

function SearchPaper({ paperList, setPaperList }) {
  return (
    <div>
      {paperList !== [] ? (
        <BoxPaperFeed>
          {paperList?.map((paper) => {
            return (
              <PaperItem
                paper={paper}
                key={paper.paperId}
                myHeart={paper.myHeart}
                likeCount={paper.likeCount}
                // likePaper={likePaper}
                // likePaperDelete={likePaperDelete}
              />
            );
          })}
        </BoxPaperFeed>
      ) : (
        <span>'검색 결과를 찾을 수 없습니다.'</span>
      )}
    </div>
  );
}

export default SearchPaper;
