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
import { CATEGORIES } from "@/constants/categories";

function getGamesByCategory(data) {
  if (!data || !data.data || !Array.isArray(data.data.items)) return {};
  const games = data.data.items;
  const byCategory = {};
  CATEGORIES.forEach(cat => {
    byCategory[cat.key] = games.filter(cat.filter);
  });
  // Providers section logic (if needed in the future)
  byCategory["PROVIDERS"] = Array.from(new Set(games.map(g => g.vendor))).map(vendor => ({ vendor }));
  return byCategory;
}

export default function Home() {
  const { selectedCategory, searchQuery } = useFilterStore();
  const { data, isLoading, error, refetch } = useGames({
    limit: 100,
    offset: 0,
    sort: "popularity",
    order: "desc",
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
            {searchQuery && searchQuery.trim().length > 0 && !selectedCategory && <SearchResults />}
            {/* Show filtered results when a category is selected and not searching */}
            {selectedCategory && (!searchQuery || searchQuery.trim().length === 0) && <GameResults />}
            {/* Show original category sections when no filter or search is selected */}
            {!selectedCategory && (!searchQuery || searchQuery.trim().length === 0) && (
              <>
                {CATEGORIES.map(cat =>
                  gamesByCategory[cat.key] && gamesByCategory[cat.key].length > 0 ? (
                    <CategorySection
                      key={cat.key}
                      title={cat.label}
                      games={gamesByCategory[cat.key]}
                      icon={cat.icon}
                    />
                  ) : null
                )}
                {/* Providers section would need a different card UI, skipping for now */}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
