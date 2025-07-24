"use client";

import React from "react";

import { useFilterStore } from "@/store/filters";
import { filterOptions } from "@/constants/categories";

import s from "./FilterBar.module.scss";

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
