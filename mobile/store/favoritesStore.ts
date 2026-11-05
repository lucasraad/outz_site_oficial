import { createStore } from 'zustand/vanilla';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

export type AppState = {
  favoriteIds: string[];
  hasHydrated: boolean;
  storageError: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

// A storage injetável permite verificar persistência sem depender do runtime nativo.
export function createFavoritesStore(storage: StateStorage) {
  return createStore<AppState>()(
    persist(
      (set, get) => ({
        favoriteIds: [],
        hasHydrated: false,
        storageError: false,
        toggleFavorite: (id) => {
          if (!get().hasHydrated) return;
          set((state) => ({
            favoriteIds: state.favoriteIds.includes(id)
              ? state.favoriteIds.filter((item) => item !== id)
              : [...state.favoriteIds, id],
          }));
        },
        isFavorite: (id) => get().favoriteIds.includes(id),
      }),
      {
        name: 'outz-favorites',
        version: 1,
        storage: createJSONStorage(() => storage),
        partialize: (state) => ({ favoriteIds: state.favoriteIds }),
        skipHydration: true,
      },
    ),
  );
}
