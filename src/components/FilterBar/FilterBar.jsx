"use client";
import React, { useState } from "react";
import s from "./FilterBar.module.scss";

const filterOptions = [
  {
    value: "Jackpot Originals",
  },
  {
    value: "New Games",
  },
  {
    value: "Slots",
  },
  {
    value: "Featured Games",
  },
  {
    value: "Live Dealer",
  },
  {
    value: "Game Shows",
  },
  {
    value: "Table Games",
  },
];
const FilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  return (
    <div className={s.filterBarContainer}>
      {filterOptions.map((option, idx) => (
        <div
          className={`${s.filterOption} ${
            selectedFilter === idx ? s.selected : ""
          }`}
          key={idx}
          onClick={() => setSelectedFilter(idx)}
        >
          {option.value}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
