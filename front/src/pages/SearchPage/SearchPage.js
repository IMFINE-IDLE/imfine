import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchDiary from '../../components/Search/SearchDiary/SearchDiary';
import SearchNavBar from '../../components/Search/SearchNavBar/SearchNavBar';
import SearchPaper from '../../components/Search/SearchPaper/SearchPaper';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import SearchUser from '../../components/Search/SearchUser/SearchUser';
import Tabs from '../../components/Tabs/Tabs';
import { addSearchHistory } from '../../store/slice/userInfoSlice';
import { BigCircle } from '../PaperFeedPage/style';

function SearchPage() {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.userInfo.searchHistory);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(''); // 검색창에 검색하는 쿼리
  const [queryResult, setQueryResult] = useState(''); // {{queryResult}}에 대한 검색결과 (검색완료한 쿼리)

  const handleSearch = async (query) => {
    try {
      // query 가지고 서치 api 요청

      setIsSearching(true);
      dispatch(addSearchHistory(query)); // 최근 검색어 저장
      setQueryResult(query);
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
          <SearchResult queryResult={queryResult} />
          <Tabs tabArr={tabArr} btnWidth={'6.2em'} />
          {/* <TabBar /> */}
        </div>
      ) : (
        <div>
          <h2>최근 검색어</h2>
          <div>
            {searchHistory.map((searchItem) => (
              <div>{searchItem}</div>
            ))}
          </div>
          <BigCircle />
        </div>
      )}
    </>
  );
}

export default SearchPage;
