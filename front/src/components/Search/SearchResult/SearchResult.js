import React from 'react';
import { Clover } from '../../common/Clover/Clover';
import { BoxSearchResult } from './style';

function SearchResult({ keywordResult }) {
  return (
    <BoxSearchResult>
      <span style={{ fontWeight: '700' }}>{keywordResult}</span>
      <span>&nbsp;에 대한 검색 결과</span>
      <span style={{ marginLeft: '.3em' }}>
        <Clover code={'1'} />
      </span>
    </BoxSearchResult>
  );
}

export default SearchResult;
