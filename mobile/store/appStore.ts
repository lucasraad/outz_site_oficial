import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from 'zustand';

import { createFavoritesStore, type AppState } from './favoritesStore';

let readFailed = false;

export const appStore = createFavoritesStore({
  getItem: async (name) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      readFailed = true;
      return null;
    }
  },
  setItem: async (name, value) => {
    if (readFailed) return; // Não sobrescreva favoritos que não puderam ser lidos.
    try {
      await AsyncStorage.setItem(name, value);
    } catch {
      if (!appStore.getState().storageError) {
        appStore.setState({ storageError: true });
      }
    }
  },
  removeItem: (name) => AsyncStorage.removeItem(name),
});

let hydration: Promise<void> | undefined;
export function hydrateFavorites() {
  hydration ??= Promise.resolve(appStore.persist.rehydrate()).then(() => {
    appStore.setState({ hasHydrated: true, storageError: readFailed });
  });
  return hydration;
}

export function useAppStore<T>(selector: (state: AppState) => T): T {
  return useStore(appStore, selector);
}
