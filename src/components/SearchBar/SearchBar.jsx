import React, { useState } from 'react';
import Image from 'next/image';

import SearchIconGrey from '@/assets/images/searchIconGrey.png';
import { useFilterStore } from '@/store/filters';

import s from './SearchBar.module.scss';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, clearSearch } = useFilterStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setInputValue('');
    clearSearch();
  };

  return (
    <div className={s.searchBar}>
      <Image src={SearchIconGrey} alt="search" className={s.searchIcon} />
      <input
        className={s.input}
        type="text"
        placeholder="Search a game..."
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <button 
          className={s.clearButton}
          onClick={handleClearSearch}
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
