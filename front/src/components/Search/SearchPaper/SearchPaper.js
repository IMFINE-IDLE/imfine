import React from 'react';
import PaperList from '../../Paper/PaperList/PaperList';
import SearchNoResult from '../SearchNoResult/SearchNoResult';
import { BoxSearchPaper } from './style';

function SearchPaper({ paperList }) {
  return (
    <BoxSearchPaper>
      {paperList.length > 0 ? (
        <PaperList paperList={paperList} />
      ) : (
        <SearchNoResult />
      )}
    </BoxSearchPaper>
  );
}

export default SearchPaper;
