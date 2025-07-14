"use client";

import React, { useEffect, useCallback } from "react";

import { useGames } from "@/hooks/useGames";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFilterStore } from "@/store/filters";
import GameGrid from "@/components/GameGrid/GameGrid";
import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";
import EmptyState from "@/components/EmptyState/EmptyState";

import s from "./GameResults.module.scss";

const GameResults = () => {
  const { selectedCategory, filterParams, allGames, hasMore, addGames, loadMore } = useFilterStore();
  
  const { data, isLoading, error } = useGames(filterParams);

  // Add new games to the store when data changes
  useEffect(() => {
    if (data?.data?.items && !isLoading) {
      addGames(data.data.items);
    }
  }, [data, isLoading, addGames]);

  // Infinite scroll callback
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadMore();
    }
  }, [isLoading, hasMore, loadMore]);

  // Set up infinite scroll
  useInfiniteScroll(handleLoadMore, hasMore, isLoading);

  if (!selectedCategory) {
    return null; // Don't render anything when no category is selected
  }

  if (error && allGames.length === 0) {
    return (
      <div className={s.gameResultsContainer}>
        <div className={s.header}>
          <h2>{selectedCategory}</h2>
        </div>
        <ErrorState message="Failed to load games" />
      </div>
    );
  }

  return (
    <div className={s.gameResultsContainer}>

      
      {allGames.length > 0 ? (
        <>
          <GameGrid games={allGames} />
          
          {/* Load More Button (fallback for users who prefer manual loading) */}
          {hasMore && (
            <div className={s.loadMoreContainer}>
              <button 
                className={s.loadMoreButton}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          
          {/* Loading indicator for subsequent loads */}
          {isLoading && allGames.length > 0 && (
            <div className={s.loadingMore}>
              <Loader />
            </div>
          )}
        </>
      ) : isLoading ? (
        <Loader />
      ) : (
        <EmptyState message={`No ${selectedCategory} found`} />
      )}
      
      {/* Show error for subsequent loads */}
      {error && allGames.length > 0 && (
        <div className={s.errorContainer}>
          <ErrorState message="Failed to load more games" />
        </div>
      )}
    </div>
  );
};

export default GameResults; 