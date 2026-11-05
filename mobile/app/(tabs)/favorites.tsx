import { useQueries } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { fetchEstablishmentProfile } from '@/services/establishments';
import { fetchMusicianProfile } from '@/services/musicians';
import { useAppStore } from '@/store/appStore';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const storageError = useAppStore((s) => s.storageError);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const queries = useQueries({
    queries: favoriteIds.map((key) => {
      const [kind, id] = key.split(':');
      return {
        queryKey: [kind, id],
        queryFn: async () => {
          if (kind === 'musician') return fetchMusicianProfile(id);
          if (kind === 'establishment') return fetchEstablishmentProfile(id);
          throw new Error('Tipo de favorito desconhecido');
        },
        enabled: hasHydrated,
        retry: false,
      };
    }),
  });

  return (
    <ScrollView
      className="flex-1 bg-background-warm"
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 32 }}
    >
      <Text className="text-h1 font-bold text-content-primary">Favoritos</Text>
      <Text className="mt-2 text-body-sm text-content-secondary">
        Artistas e estabelecimentos salvos neste dispositivo.
      </Text>
      {storageError ? (
        <Text accessibilityRole="alert" className="mt-3 text-body-sm text-content-secondary">
          Não foi possível salvar no dispositivo. Suas alterações podem se perder ao fechar o app.
        </Text>
      ) : null}
      {!hasHydrated ? <ActivityIndicator className="mt-6" color="#FF541B" /> : null}
      {hasHydrated && favoriteIds.length === 0 ? (
        <Text className="mt-6 text-body text-content-secondary">
          Abra um perfil e toque em Favoritar para adicioná-lo aqui.
        </Text>
      ) : null}
      {favoriteIds.map((key, index) => {
        const query = queries[index];
        const [kind, id] = key.split(':');
        return (
          <View key={key} className="mt-4 gap-3 rounded-xl bg-white p-4">
            <Text className="text-body font-bold text-content-primary">
              {query.data?.name ?? (query.isPending ? 'Carregando...' : 'Perfil indisponível')}
            </Text>
            <Text className="text-caption text-content-secondary">
              {kind === 'musician' ? 'Artista' : 'Estabelecimento'}
            </Text>
            {query.data ? (
              <Button
                label="Ver perfil"
                onPress={() => router.push({
                  pathname: kind === 'musician' ? '/musician/[id]' : '/establishment/[id]',
                  params: { id },
                })}
              />
            ) : null}
            <Button
              label="Remover dos favoritos"
              variant="outline"
              disabled={!hasHydrated}
              accessibilityLabel={`Remover ${query.data?.name ?? 'perfil'} dos favoritos`}
              onPress={() => toggleFavorite(key)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}
