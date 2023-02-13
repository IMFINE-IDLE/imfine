import React from 'react';
import PaperItem from '../PaperItem/PaperItem';

function PaperList({ paperList, likePaper, likePaperDelete }) {
  return (
    <>
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
    </>
  );
}

export default PaperList;
