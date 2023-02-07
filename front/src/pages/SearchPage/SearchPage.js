import React from 'react';
import SearchNavBar from '../../components/Search/SearchNavBar/SearchNavBar';

function SearchPage() {
  const handleSearch = async (query) => {
    try {
      // query 가지고 서치 api 요청
      console.log('제출');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SearchNavBar handleSearch={handleSearch} />
      SearchPage
      <div>검색페이지에용</div>
    </>
  );
}

export default SearchPage;
