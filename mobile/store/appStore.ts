import { create } from 'zustand';

type AppState = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useAppStore = create<AppState>((set, get) => ({
  favoriteIds: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((item) => item !== id)
        : [...state.favoriteIds, id],
    })),
  isFavorite: (id) => get().favoriteIds.includes(id),
}));
