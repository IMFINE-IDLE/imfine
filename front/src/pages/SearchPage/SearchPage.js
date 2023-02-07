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
import {
  BoxClover,
  BoxInner,
  BoxRecentQuery,
  QueryItem,
  TitleRecent,
} from './style';
import TabBar from '../../components/TabBar/TabBar';
import { Clover } from '../../components/common/Clover/Clover';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.userInfo.searchHistory);
  const [keyword, setKeyword] = useState(''); // 검색창에 검색하는 쿼리
  const [keywordResult, setKeywordResult] = useState(''); // {{queryResult}}에 대한 검색결과 (검색완료한 쿼리)

  const handleSearch = async (trimmedKeyword) => {
    if (trimmedKeyword === '' || trimmedKeyword === null) {
      return;
    }
    setSearchParams({ query: trimmedKeyword });
    setKeywordResult(trimmedKeyword);
    dispatch(addSearchHistory(trimmedKeyword)); // 최근 검색어 저장

    try {
      // query 가지고 서치 api 요청
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
    let currentQuery = searchParams.get('query');
    if (currentQuery === '' || currentQuery === null) {
      setKeyword('');
      return;
    }

    let trimmedQuery = currentQuery.trim();
    setKeyword(trimmedQuery);
    setKeywordResult(trimmedQuery);
  }, [dispatch, searchParams]);

  return (
    <>
      <SearchNavBar
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
      />
      <BoxClover>
        <Clover code={'1'} width={'80px'} height={'80px'} />
      </BoxClover>
      {searchParams.get('query') ? (
        <div>
          <SearchResult keywordResult={keywordResult} />
          <Tabs tabArr={tabArr} btnWidth={'6.2em'} />
        </div>
      ) : (
        <BoxRecentQuery>
          <TitleRecent>최근 검색어</TitleRecent>
          <BoxInner>
            {searchHistory.map((searchItem, idx) => (
              <QueryItem key={idx}>
                {searchItem}
                <span>X</span>
              </QueryItem>
            ))}
          </BoxInner>
          <BigCircle />
        </BoxRecentQuery>
      )}
      <TabBar />
    </>
  );
}

export default SearchPage;
