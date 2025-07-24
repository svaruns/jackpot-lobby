'use client';

import { useMemo } from "react";

import NavHeader from "@/components/NavHeader/NavHeader";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useGames } from "@/hooks/useGames";
import { useFilterStore } from "@/store/filters";
import FilterBar from "@/components/FilterBar/FilterBar";
import { CATEGORIES } from "@/constants/categories";
import { getGamesByCategory } from "@/utils/gameUtils";
import HomeContent from "@/components/HomeContent/HomeContent";

import s from "./page.module.css";

export default function Home() {
  const { selectedCategory, searchQuery } = useFilterStore();
  const { data, isLoading, error, refetch } = useGames({
    limit: 100,
    offset: 0,
    sort: "popularity",
    order: "desc",
  });
  const gamesByCategory = useMemo(() => getGamesByCategory(data), [data]);

  return (
    <>
      <NavHeader />
      <div className={s.pageContainer}>
        <HeroBanner />
        <SearchBar />
        <FilterBar />
        <HomeContent
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          gamesByCategory={gamesByCategory}
          CATEGORIES={CATEGORIES}
        />
      </div>
    </>
  );
}
