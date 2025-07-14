import { create } from 'zustand';

export const useFilterStore = create((set, get) => ({
  selectedCategory: null,
  searchQuery: '',
  filterParams: {
    limit: 50,
    offset: 0,
    sort: 'popularity',
    order: 'desc',
    category: null
  },
  allGames: [], // Store all loaded games
  hasMore: true, // Track if there are more games to load
  
  setSelectedCategory: (category) => {
    const filterParams = get().getFilterParamsForCategory(category);
    set({ 
      selectedCategory: category,
      searchQuery: '', // Clear search when category is selected
      filterParams,
      allGames: [], // Reset games when category changes
      hasMore: true // Reset hasMore flag
    });
  },
  
  setSearchQuery: (query) => {
    set({ 
      searchQuery: query,
      selectedCategory: null, // Clear category when searching
      allGames: [], // Reset games when search changes
      hasMore: true // Reset hasMore flag
    });
  },
  
  clearSearch: () => {
    set({ 
      searchQuery: '',
      allGames: [],
      hasMore: true
    });
  },
  
  getFilterParamsForCategory: (category) => {
    const baseParams = {
      limit: 50,
      offset: 0,
      order: 'desc'
    };
    
    switch (category) {
      case 'Jackpot Originals':
        return { ...baseParams, category: 'ORIGINAL' };
      case 'Slots':
        return { ...baseParams, category: 'VIDEOSLOTS' };
      case 'Game Shows':
        return { ...baseParams, category: 'GAMESHOWS' };
      case 'Table Games':
        return { ...baseParams, category: 'TABLEGAMES' };
      case 'Live Dealer':
        return { ...baseParams, category: 'LIVEDEALER' };
      case 'Featured Games':
        return { ...baseParams, sort: 'popularity' };
      case 'New Games':
        return { ...baseParams, sort: 'createdAt' };
      default:
        return { ...baseParams, sort: 'popularity' };
    }
  },
  
  loadMore: () => {
    const { filterParams, allGames } = get();
    const newOffset = allGames.length;
    const newFilterParams = { ...filterParams, offset: newOffset };
    
    set({ filterParams: newFilterParams });
  },
  
  addGames: (newGames) => {
    const { allGames } = get();
    const updatedGames = [...allGames, ...newGames];
    const hasMore = newGames.length === 50; // If we got less than 50, we've reached the end
    
    set({ 
      allGames: updatedGames,
      hasMore
    });
  },
  
  clearFilters: () => {
    set({ 
      selectedCategory: null,
      searchQuery: '',
      filterParams: {
        limit: 50,
        offset: 0,
        sort: 'popularity',
        order: 'desc',
        category: null
      },
      allGames: [],
      hasMore: true
    });
  }
}));
