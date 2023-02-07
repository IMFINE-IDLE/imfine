import React from 'react';
import { BiChevronLeft, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import {
  BoxChevronLeft,
  BoxNavBar,
  BoxSearchInput,
  SearchInput,
} from './style';

function SearchNavBar() {
  const navigate = useNavigate();
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
        <BiSearch />
        <SearchInput type="text" />
      </BoxSearchInput>
    </BoxNavBar>
  );
}

export default SearchNavBar;
