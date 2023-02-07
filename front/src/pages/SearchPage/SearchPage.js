import React, { useState } from 'react';
import SearchDiary from '../../components/Search/SearchDiary/SearchDiary';
import SearchNavBar from '../../components/Search/SearchNavBar/SearchNavBar';
import SearchPaper from '../../components/Search/SearchPaper/SearchPaper';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import SearchUser from '../../components/Search/SearchUser/SearchUser';
import Tabs from '../../components/Tabs/Tabs';
import { BigCircle } from '../PaperFeedPage/style';

function SearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (query) => {
    try {
      // query 가지고 서치 api 요청
      console.log('제출');
      setIsSearching(true);
    } catch (err) {
      console.log(err);
    }
  };

  const tabArr = [
    { idx: 0, tabName: '일기', tabContent: <SearchPaper /> },
    { idx: 1, tabName: '일기장', tabContent: <SearchDiary /> },
    { idx: 2, tabName: '유저', tabContent: <SearchUser /> },
  ];
  return (
    <>
      <SearchNavBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {isSearching ? (
        <div>
          <SearchResult query={query} />
          <Tabs tabArr={tabArr} btnWidth={'6.2em'} />
          {/* <TabBar /> */}
        </div>
      ) : (
        <div>
          <div>
            <h2>최근 검색어</h2>
          </div>
          <div>블라블라</div>
          <BigCircle />
        </div>
      )}
    </>
  );
}

export default SearchPage;
