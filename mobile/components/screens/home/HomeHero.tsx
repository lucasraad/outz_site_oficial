import { Image, ImageBackground, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HERO_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80',
};

type HomeHeroProps = {
  liveCount: number;
  upcomingCount: number;
};

export function HomeHero({ liveCount: _live, upcomingCount: _upcoming }: HomeHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-black">
      <ImageBackground source={HERO_IMAGE} className="h-[360px] w-full" resizeMode="cover">
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute inset-0 bg-primary/20" />

        <View
          className="flex-1 justify-between px-5 pb-14"
          style={{ paddingTop: insets.top + 8 }}
        >
          <View className="flex-row gap-2">
            <View className="flex-row items-center gap-1.5 rounded-pill bg-semantic-info px-3 py-1.5">
              <FontAwesome name="circle" size={6} color="#FF541B" />
              <Text className="text-caption font-semibold text-content-inverse">
                Ao vivo
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 rounded-pill bg-background px-3 py-1.5">
              <FontAwesome name="map-pin" size={11} color="#1B1B1B" />
              <Text className="text-caption font-semibold text-content-primary">Em breve</Text>
            </View>
          </View>

          <View className="items-center">
            <Image
              source={require('@/assets/images/logo-outz.png')}
              className="h-[120px] w-[120px]"
              resizeMode="contain"
              accessibilityLabel="Logo OUTz"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
