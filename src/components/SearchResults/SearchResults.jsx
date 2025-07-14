"use client";

import React from "react";
import { useSearchGames } from "@/hooks/useSearchGames";
import { useFilterStore } from "@/store/filters";
import GameGrid from "@/components/GameGrid/GameGrid";
import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";
import EmptyState from "@/components/EmptyState/EmptyState";

import s from "./SearchResults.module.scss";

const SearchResults = () => {
  const { searchQuery } = useFilterStore();
  
  const { data, isLoading, error } = useSearchGames(searchQuery, 500);

  if (!searchQuery || searchQuery.trim().length === 0) {
    return null; 
  }

  if (isLoading) {
    return (
      <div className={s.searchResultsContainer}>
        <div className={s.header}>
          <h2>Search Results</h2>
          <span className={s.searchQuery}>"{searchQuery}"</span>
        </div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.searchResultsContainer}>
        <div className={s.header}>
          <h2>Search Results</h2>
          <span className={s.searchQuery}>"{searchQuery}"</span>
        </div>
        <ErrorState message="Failed to search games" />
      </div>
    );
  }

  const games = data?.data?.items || [];

  return (
    <div className={s.searchResultsContainer}>
      {games.length > 0 ? (
        <GameGrid games={games} />
      ) : (
        <EmptyState message={`No games found for "${searchQuery}"`} />
      )}
    </div>
  );
};

export default SearchResults; 