import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://jpapi-staging.jackpot.bet';

/**
 * Fetches games from the API with support for pagination, sorting, and filtering.
 * @param {Object} params - Query parameters for the API call.
 * @param {number} params.limit - Number of games to fetch.
 * @param {number} params.offset - Offset for pagination.
 * @param {string} params.sort - Field to sort by.
 * @param {string} params.order - Sort order (asc, desc).
 * @param {string} params.category - Category filter.
 * @param {string[]} params.vendor - Vendor(s) filter.
 * @param {string} params.excludeCategory - Exclude category filter.
 * @returns {Object} React Query result object (data, error, isLoading, etc.)
 */
const fetchGames = async (params) => {
  const { limit, offset, sort, order, category, vendor, excludeCategory } = params || {};
  const searchParams = new URLSearchParams();
  if (limit) searchParams.append('limit', limit);
  if (offset) searchParams.append('offset', offset);
  if (sort) searchParams.append('sort', sort);
  if (order) searchParams.append('order', order);
  if (category) searchParams.append('category', category);
  if (vendor && Array.isArray(vendor)) {
    vendor.forEach(v => searchParams.append('vendor', v));
  }
  if (excludeCategory) searchParams.append('excludeCategory', excludeCategory);

  const url = `${API_BASE_URL}/casino/games?${searchParams.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Custom hook to fetch games with React Query and retry logic.
 * @param {Object} params - Query parameters for the API call.
 * @returns {Object} React Query result object (data, error, isLoading, etc.)
 */
export function useGames(params) {
  return useQuery({
    queryKey: ['games', params],
    queryFn: () => fetchGames(params),
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000), // Exponential backoff
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
