import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventDetails } from '@/components/screens/event/EventDetails';
import { Button } from '@/components/ui';
import { Colors } from '@/constants/Colors';
import { useEvent } from '@/hooks/queries/useEvent';
import { EventNotFoundError } from '@/services/events';

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const eventId = typeof id === 'string' ? id : '';
  const { data, isPending, error, refetch } = useEvent(eventId);
  const insets = useSafeAreaInsets();
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-background-warm">
      <View className="flex-row items-center gap-3 border-b border-black/10 px-3 py-2">
        <Button label="Voltar" variant="ghost" onPress={goBack} />
        <Text className="text-body font-bold text-content-primary">Evento</Text>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
        {isPending ? (
          <View className="items-center gap-4 px-5 py-12">
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text className="text-body text-content-secondary">Carregando evento...</Text>
          </View>
        ) : error ? (
          <View className="gap-4 px-5 py-12">
            <Text accessibilityRole="header" className="text-h2 font-bold text-content-primary">
              {error instanceof EventNotFoundError ? 'Evento não encontrado' : 'Não foi possível carregar o evento'}
            </Text>
            <Text className="text-body text-content-secondary">
              {error instanceof EventNotFoundError
                ? 'Esta apresentação não está no catálogo de demonstração. Volte à Home para escolher outro evento.'
                : 'Tente novamente em instantes.'}
            </Text>
            {!(error instanceof EventNotFoundError) ? (
              <Button label="Tentar novamente" onPress={() => void refetch()} />
            ) : null}
            <Button label="Ir para a Home" variant="outline" onPress={() => router.replace('/')} />
          </View>
        ) : data ? (
          <EventDetails
            event={data}
            onArtistPress={(artistId) => router.push({ pathname: '/musician/[id]', params: { id: artistId } })}
            onVenuePress={(venueId) => router.push({ pathname: '/establishment/[id]', params: { id: venueId } })}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
