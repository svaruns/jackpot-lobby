import { CATEGORIES } from "@/constants/categories";

/**
 * Groups games by category and adds a providers section.
 * @param {object} data - The data object containing games.
 * @returns {object} An object with games grouped by category and providers.
 */
export function getGamesByCategory(data) {
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