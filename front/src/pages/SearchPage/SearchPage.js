import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SearchDiary from '../../components/Search/SearchDiary/SearchDiary';
import SearchNavBar from '../../components/Search/SearchNavBar/SearchNavBar';
import SearchPaper from '../../components/Search/SearchPaper/SearchPaper';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import SearchUser from '../../components/Search/SearchUser/SearchUser';
import Tabs from '../../components/Tabs/Tabs';
import { addSearchHistory } from '../../store/slice/userInfoSlice';
import { BigCircle } from '../PaperFeedPage/style';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.userInfo.searchHistory);
  const [query, setQuery] = useState(''); // 검색창에 검색하는 쿼리
  const [queryResult, setQueryResult] = useState(''); // {{queryResult}}에 대한 검색결과 (검색완료한 쿼리)

  const handleSearch = async (queryInput) => {
    if (queryInput === '' || queryInput === null) {
      return;
    }
    try {
      // query 가지고 서치 api 요청
      setSearchParams({ query: queryInput });
      dispatch(addSearchHistory(queryInput)); // 최근 검색어 저장
      setQueryResult(queryInput);
    } catch (err) {
      console.log(err);
    }
  };

  const tabArr = [
    { idx: 0, tabName: '일기', tabContent: <SearchPaper /> },
    { idx: 1, tabName: '일기장', tabContent: <SearchDiary /> },
    { idx: 2, tabName: '유저', tabContent: <SearchUser /> },
  ];

  useEffect(() => {
    const currentQuery = searchParams.get('query');
    if (currentQuery === '' || currentQuery === null) {
      return;
    }
    console.log(currentQuery);
    setQuery(currentQuery);
    dispatch(addSearchHistory(currentQuery));
    setQueryResult(currentQuery);
  }, []);

  return (
    <>
      <SearchNavBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {searchParams.get('query') ? (
        <div>
          <SearchResult queryResult={queryResult} />
          <Tabs tabArr={tabArr} btnWidth={'6.2em'} />
          {/* <TabBar /> */}
        </div>
      ) : (
        <div>
          <h2>최근 검색어</h2>
          <div>
            {searchHistory.map((searchItem, idx) => (
              <div key={idx}>{searchItem}</div>
            ))}
          </div>
          <BigCircle />
        </div>
      )}
    </>
  );
}

export default SearchPage;
