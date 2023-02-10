import React, { useEffect } from 'react';
import PaperList from '../../Paper/PaperList/PaperList';

function SearchPaper({ handlePaperSearch, paperList, currentQuery }) {
  useEffect(() => {
    handlePaperSearch(currentQuery);
  }, []);

  return (
    <>
      {paperList.length > 0 ? (
        <div>
          <PaperList paperList={paperList} />
        </div>
      ) : (
        <span>검색 결과를 찾을 수 없습니다.</span>
      )}
    </>
  );
}

export default SearchPaper;
