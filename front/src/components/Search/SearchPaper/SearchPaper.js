import React from 'react';
import PaperList from '../../Paper/PaperList/PaperList';
import { BoxSearchPaper } from './style';

function SearchPaper({ paperList }) {
  return (
    <BoxSearchPaper>
      {paperList.length > 0 ? (
        <PaperList paperList={paperList} />
      ) : (
        <span>검색 결과를 찾을 수 없습니다.</span>
      )}
    </BoxSearchPaper>
  );
}

export default SearchPaper;
