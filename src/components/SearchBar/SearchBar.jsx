import React from 'react';
import s from './SearchBar.module.scss';
import Image from 'next/image';
import SearchIconGrey from '@/assets/images/searchIconGrey.png';

const SearchBar = () => {
  return (
    <div className={s.searchBar}>
      <Image src={SearchIconGrey} alt="search" className={s.searchIcon} />
      <input
        className={s.input}
        type="text"
        placeholder="Search a game..."
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
