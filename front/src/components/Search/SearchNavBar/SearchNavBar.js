import React from 'react';
import { BiChevronLeft, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import {
  BoxChevronLeft,
  BoxNavBar,
  BoxSearchInput,
  SearchInput,
} from './style';

function SearchNavBar({
  keyword,
  setKeyword,
  handlePaperSearch,
  searchParams,
}) {
  const navigate = useNavigate();
  const currentQuery = searchParams.get('query');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmedString = e.target.value.trim();
      if (trimmedString === '' || trimmedString === null) {
        alert('검색어를 입력해주세요.');
        setKeyword('');
        return;
      }
      setKeyword(trimmedString);
      handlePaperSearch(trimmedString);
    }
  };

  return (
    <BoxNavBar color={currentQuery ? 'main' : null}>
      <BoxChevronLeft
        onClick={() => {
          currentQuery ? navigate('/search') : navigate('/');
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
