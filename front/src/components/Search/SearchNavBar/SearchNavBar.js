import React, { useState } from 'react';
import { BiChevronLeft, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import {
  BoxChevronLeft,
  BoxNavBar,
  BoxSearchInput,
  SearchInput,
} from './style';

function SearchNavBar({ handleSearch }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <BoxNavBar>
      <BoxChevronLeft
        onClick={() => {
          navigate(-1);
        }}
        justify="left"
      >
        <BiChevronLeft />
      </BoxChevronLeft>
      <BoxSearchInput>
        <BiSearch style={{ cursor: 'default' }} />
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="검색어를 입력하세요"
          type="text"
          onKeyPress={onKeyPress}
        />
      </BoxSearchInput>
    </BoxNavBar>
  );
}

export default SearchNavBar;
