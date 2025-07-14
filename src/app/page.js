'use client';

import NavHeader from "@/components/NavHeader/NavHeader";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import SearchBar from "@/components/SearchBar/SearchBar";
import CategorySection from "@/components/CategorySection/CategorySection";
import GameResults from "@/components/GameResults/GameResults";
import { useGames } from "@/hooks/useGames";
import { useFilterStore } from "@/store/filters";
import s from "./page.module.css";
import FilterBar from "@/components/FilterBar/FilterBar";
import SearchResults from "@/components/SearchResults/SearchResults";
import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";

const CATEGORY_KEYS = {
  FEATURED: 'Featured Games',
  ORIGINALS: 'Jackpot Originals',
  SLOTS: 'Slots',
  PROVIDERS: 'Providers',
  TABLE: 'Table Games',
  SHOWS: 'Game Shows',
  SPORTS: 'Sports',
  NEW: 'New Games',
};

function getGamesByCategory(data) {
  if (!data || !data.data || !Array.isArray(data.data.items)) return {};
  const games = data.data.items;
  return {
    [CATEGORY_KEYS.FEATURED]: games.filter(g => g.featured),
    [CATEGORY_KEYS.ORIGINALS]: games.filter(g => g.vendor === 'JackpotOriginal' || (g.categories && g.categories.includes('ORIGINAL'))),
    [CATEGORY_KEYS.SLOTS]: games.filter(g => g.categories && g.categories.includes('VIDEOSLOTS')),
    [CATEGORY_KEYS.PROVIDERS]: Array.from(new Set(games.map(g => g.vendor))).map(vendor => ({ vendor })),
    [CATEGORY_KEYS.TABLE]: games.filter(g => g.categories && g.categories.includes('TABLEGAMES')),
    [CATEGORY_KEYS.SHOWS]: games.filter(g => g.categories && g.categories.includes('GAMESHOWSLIVEDEALER')),
    [CATEGORY_KEYS.SPORTS]: games.filter(g => g.categories && g.categories.includes('SPORTS')),
    [CATEGORY_KEYS.NEW]: games.filter(g => g.categories && g.categories.includes('NEWGAMES')),
  };
}

export default function Home() {
  const { selectedCategory, searchQuery } = useFilterStore();
  
  const { data, isLoading, error, refetch } = useGames({
    limit: 100,
    offset: 0,
    sort: 'popularity',
    order: 'desc'
  });

  const gamesByCategory = getGamesByCategory(data);


  return (
    <>
      <NavHeader />
      <div className={s.pageContainer}>
        <HeroBanner />
        <SearchBar />
        <FilterBar />
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error.message || "Failed to load games."} onRetry={refetch} />
        ) : (
          <>
            {/* Show search results if searching and no category is selected */}
            {searchQuery && searchQuery.trim().length > 0 && !selectedCategory && (
              <SearchResults />
            )}
            {/* Show filtered results when a category is selected and not searching */}
            {selectedCategory && (!searchQuery || searchQuery.trim().length === 0) && <GameResults />}
            {/* Show original category sections when no filter or search is selected */}
            {!selectedCategory && (!searchQuery || searchQuery.trim().length === 0) && (
              <>
                {gamesByCategory[CATEGORY_KEYS.FEATURED] && gamesByCategory[CATEGORY_KEYS.FEATURED].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.FEATURED} games={gamesByCategory[CATEGORY_KEYS.FEATURED]} />
                )}
                {gamesByCategory[CATEGORY_KEYS.ORIGINALS] && gamesByCategory[CATEGORY_KEYS.ORIGINALS].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.ORIGINALS} games={gamesByCategory[CATEGORY_KEYS.ORIGINALS]} />
                )}
                {gamesByCategory[CATEGORY_KEYS.SLOTS] && gamesByCategory[CATEGORY_KEYS.SLOTS].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.SLOTS} games={gamesByCategory[CATEGORY_KEYS.SLOTS]} />
                )}
                {/* Providers section would need a different card UI, skipping for now */}
                {gamesByCategory[CATEGORY_KEYS.TABLE] && gamesByCategory[CATEGORY_KEYS.TABLE].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.TABLE} games={gamesByCategory[CATEGORY_KEYS.TABLE]} />
                )}
                {gamesByCategory[CATEGORY_KEYS.SHOWS] && gamesByCategory[CATEGORY_KEYS.SHOWS].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.SHOWS} games={gamesByCategory[CATEGORY_KEYS.SHOWS]} />
                )}
                {gamesByCategory[CATEGORY_KEYS.SPORTS] && gamesByCategory[CATEGORY_KEYS.SPORTS].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.SPORTS} games={gamesByCategory[CATEGORY_KEYS.SPORTS]} />
                )}
                {gamesByCategory[CATEGORY_KEYS.NEW] && gamesByCategory[CATEGORY_KEYS.NEW].length > 0 && (
                  <CategorySection title={CATEGORY_KEYS.NEW} games={gamesByCategory[CATEGORY_KEYS.NEW]} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
