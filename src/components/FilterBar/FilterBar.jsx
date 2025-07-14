"use client";

import React from "react";

import { useFilterStore } from "@/store/filters";

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
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  const handleFilterClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className={s.filterBarContainer}>
      {filterOptions.map((option, idx) => (
        <div
          className={`${s.filterOption} ${
            selectedCategory === option.value ? s.selected : ""
          }`}
          key={idx}
          onClick={() => handleFilterClick(option.value)}
        >
          {option.value}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
