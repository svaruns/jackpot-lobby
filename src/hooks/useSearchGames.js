import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'https://jpapi-staging.jackpot.bet';

/**
 * Fetches search results from the API
 * @param {string} query - Search query string
 * @returns {Promise} API response
 */
const searchGames = async (query) => {
  if (!query || query.trim().length === 0) {
    return { data: { items: [] } };
  }

  const searchParams = new URLSearchParams();
  searchParams.append('query', query.trim());

  const url = `${API_BASE_URL}/casino/games/search?${searchParams.toString()}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

/**
 * Custom hook for searching games with debouncing
 * @param {string} searchQuery - The search query
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500ms)
 * @returns {Object} React Query result object (data, error, isLoading, etc.)
 */
export function useSearchGames(searchQuery, debounceMs = 500) {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  return useQuery({
    queryKey: ['searchGames', debouncedQuery],
    queryFn: () => searchGames(debouncedQuery),
    enabled: !!debouncedQuery && debouncedQuery.trim().length > 0,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
