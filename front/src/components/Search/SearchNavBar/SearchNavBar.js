import React from 'react';
import { BiChevronLeft, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import {
  BoxChevronLeft,
  BoxNavBar,
  BoxSearchInput,
  SearchInput,
} from './style';

function SearchNavBar({ keyword, setKeyword, handleSearch }) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedString = e.target.value.trim();
      if (trimmedString === '' || trimmedString === null) {
        alert('검색어를 입력해주세요.');
        setKeyword('');
        return;
      }
      setKeyword(trimmedString);
      handleSearch(trimmedString);
    }
  };

  return (
    <BoxNavBar>
      <BoxChevronLeft
        onClick={() => {
          navigate('/search');
        }}
        justify="left"
      >
        <BiChevronLeft />
      </BoxChevronLeft>
      <BoxSearchInput>
        <BiSearch style={{ cursor: 'default' }} />
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          placeholder="검색어를 입력하세요"
          type="text"
          onKeyDown={handleKeyDown}
        />
      </BoxSearchInput>
    </BoxNavBar>
  );
}

export default SearchNavBar;
