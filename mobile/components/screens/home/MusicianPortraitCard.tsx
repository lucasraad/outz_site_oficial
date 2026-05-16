import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/ui';
import type { MusicianCard } from '@/services/home';

const CARD_WIDTH = 188;
const CARD_HEIGHT = 292;

type MusicianPortraitCardProps = {
  item: MusicianCard;
};

export function MusicianPortraitCard({ item }: MusicianPortraitCardProps) {
  const openProfile = () => {
    router.push({ pathname: '/musician/[id]', params: { id: item.id } });
  };

  return (
    <Pressable
      onPress={openProfile}
      className="mr-4 overflow-hidden rounded-[20px] bg-surface-dark"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
      }}
      accessibilityRole="button"
      accessibilityLabel={`Ver perfil de ${item.name}`}
    >
      <Image source={{ uri: item.image }} className="absolute inset-0 h-full w-full" resizeMode="cover" />
      <View className="absolute inset-0 bg-black/20" />
      <View className="absolute bottom-0 left-0 right-0 bg-black/55 px-3 pb-3 pt-10">
        <View className="mb-2 flex-row flex-wrap gap-1.5">
          {item.genres.map((genre) => (
            <View key={genre} className="rounded-pill bg-background px-2.5 py-0.5">
              <Text className="text-[11px] font-medium text-content-primary">{genre}</Text>
            </View>
          ))}
        </View>
        <Text className="mb-3 text-body font-bold text-content-inverse">{item.name}</Text>
        <Button label="Ver detalhes" size="sm" fullWidth onPress={openProfile} />
      </View>
    </Pressable>
  );
}
