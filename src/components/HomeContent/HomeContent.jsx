import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";
import SearchResults from "@/components/SearchResults/SearchResults";
import GameResults from "@/components/GameResults/GameResults";
import CategorySection from "@/components/CategorySection/CategorySection";
import { ERROR_FAILED_TO_LOAD_GAMES } from "@/constants/strings";

export default function HomeContent({
  isLoading,
  error,
  refetch,
  searchQuery,
  selectedCategory,
  gamesByCategory,
  CATEGORIES,
}) {
  if (isLoading) return <Loader />;
  if (error) return <ErrorState message={error.message || ERROR_FAILED_TO_LOAD_GAMES} onRetry={refetch} />;

  return (
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
        </>
      )}
    </>
  );
} 