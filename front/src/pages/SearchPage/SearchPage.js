import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchDiary from '../../components/Search/SearchDiary/SearchDiary';
import SearchNavBar from '../../components/Search/SearchNavBar/SearchNavBar';
import SearchPaper from '../../components/Search/SearchPaper/SearchPaper';
import SearchResult from '../../components/Search/SearchResult/SearchResult';
import SearchUser from '../../components/Search/SearchUser/SearchUser';
import Tabs from '../../components/Tabs/Tabs';
import { BigCircle } from '../PaperFeedPage/style';
import {
  BoxClover,
  BoxInner,
  BoxRecentQuery,
  BoxSearchResult,
  QueryItem,
  TitleRecent,
} from './style';
import TabBar from '../../components/TabBar/TabBar';
import { Clover } from '../../components/common/Clover/Clover';
import api from '../../api/api';
import axios from 'axios';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query');

  const [searchHistory, setSearchHistory] = useState([]);
  const [keyword, setKeyword] = useState(''); // 검색창에 검색하는 쿼리
  const [keywordResult, setKeywordResult] = useState(''); // {{queryResult}}에 대한 검색결과 (검색완료한 쿼리)

  const [paperList, setPaperList] = useState([]);

  // 일기 검색
  const handlePaperSearch = async (keyword) => {
    try {
      const res = await axios.get(api.search.search('paper', keyword));
      console.log(res.data.data.list);
      setPaperList(res.data.data.list);
    } catch (err) {
      console.log(err);
    }
  };

  // 첫 페이지 일기 검색
  const handleSearch = async (trimmedKeyword) => {
    if (trimmedKeyword === '' || trimmedKeyword === null) {
      return;
    }
    setSearchParams({ query: trimmedKeyword });
    setKeywordResult(trimmedKeyword);
    postSearchKeywordList(trimmedKeyword); // 최근 검색어에 저장

    handlePaperSearch(trimmedKeyword);
  };

  // 최근 검색어 저장
  const postSearchKeywordList = async (trimmedKeyword) => {
    const data = { query: trimmedKeyword };
    try {
      const res = await axios.post(api.search.postSearchHistory(), data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // 최근 검색어 불러오기
  const getSearchKeywordList = async () => {
    try {
      const res = await axios.get(api.search.getSearchHistory());
      console.log(res);
      setSearchHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 최근 검색어 삭제
  const deleteSearchKeyword = async (keywordId) => {
    try {
      const res = await axios.delete(api.search.deleteSearchHistory(keywordId));
      console.log(res);
      getSearchKeywordList();
    } catch (err) {
      console.log(err);
    }
  };

  const tabArr = [
    {
      idx: 0,
      tabName: '일기',
      tabContent: (
        <SearchPaper
          paperList={paperList}
          currentQuery={currentQuery}
          handlePaperSearch={handlePaperSearch}
        />
      ),
    },
    {
      idx: 1,
      tabName: '일기장',
      tabContent: <SearchDiary currentQuery={currentQuery} />,
    },
    {
      idx: 2,
      tabName: '유저',
      tabContent: <SearchUser currentQuery={currentQuery} />,
    },
  ];

  useEffect(() => {
    getSearchKeywordList();

    // 주소창 쳐서 들어올 경우
    if (currentQuery === '' || currentQuery === null) {
      setKeyword('');
      return;
    }
    let trimmedQuery = currentQuery.trim();
    setKeyword(trimmedQuery);
    setKeywordResult(trimmedQuery);
  }, [searchParams]);

  return (
    <>
      <SearchNavBar
        keyword={keyword}
        setKeyword={setKeyword}
        handleSearch={handleSearch}
        searchParams={searchParams}
      />

      {searchParams.get('query') ? (
        <BoxSearchResult>
          <SearchResult keywordResult={keywordResult} />
          <Tabs tabArr={tabArr} btnWidth={'6.2em'} />
        </BoxSearchResult>
      ) : (
        <>
          <BoxClover>
            <Clover code={'1'} width={'65px'} height={'65px'} />
          </BoxClover>
          <BoxRecentQuery>
            <TitleRecent>최근 검색어</TitleRecent>
            <BoxInner>
              {searchHistory?.map(({ query, searchId }) => (
                <QueryItem key={searchId}>
                  <span
                    onClick={() => {
                      handleSearch(query);
                    }}
                  >
                    {query}
                  </span>
                  <span
                    onClick={() => {
                      deleteSearchKeyword(searchId);
                    }}
                  >
                    X
                  </span>
                </QueryItem>
              ))}
            </BoxInner>
            <BigCircle />
          </BoxRecentQuery>
        </>
      )}
      <TabBar />
    </>
  );
}

export default SearchPage;
