import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

import { HomeHero } from '@/components/screens/home/HomeHero';
import { HomeSeViraSection } from '@/components/screens/home/HomeSeViraSection';
import { MatchCarousel } from '@/components/screens/home/MatchCarousel';
import { MusicianCarousel } from '@/components/screens/home/MusicianCarousel';
import { useRefreshControl } from '@/hooks/useRefreshControl';
import { useHomeFeed } from '@/services/home';

export default function HomeScreen() {
  const { data, isLoading, isError, refetch } = useHomeFeed();
  const { refreshing, onRefresh } = useRefreshControl(refetch);

  if (isLoading && !data) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#FF541B" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-center text-h3 font-bold text-content-inverse">
          Não foi possível carregar o feed
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF541B" />
        }
      >
        <HomeHero liveCount={data.liveCount} upcomingCount={data.upcomingCount} />

        <View
          className="-mt-12 overflow-hidden rounded-t-sheet bg-background pt-7"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <MatchCarousel items={data.matches} />
          <MusicianCarousel items={data.musicians} />
          <HomeSeViraSection />
        </View>
      </ScrollView>
    </View>
  );
}
