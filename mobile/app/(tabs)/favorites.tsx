import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppStore } from '@/store/appStore';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const favoriteIds = useAppStore((s) => s.favoriteIds);

  return (
    <View
      className="flex-1 items-center justify-center bg-background-warm px-6"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-h1 font-bold text-content-primary">Favoritos</Text>
      {favoriteIds.length === 0 ? (
        <Text className="mt-3 text-center text-body text-content-secondary">
          Toque no coração nos cards da Home para salvar artistas favoritos.
        </Text>
      ) : (
        <Text className="mt-3 text-body text-content-secondary">
          {favoriteIds.length} item(ns) favoritado(s)
        </Text>
      )}
    </View>
  );
}
