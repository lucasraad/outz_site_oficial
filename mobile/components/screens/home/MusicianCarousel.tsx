import { ScrollView, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { SectionHeader } from '@/components/ui';
import type { MusicianCard as MusicianCardType } from '@/services/home';

import { MusicianPortraitCard } from './MusicianPortraitCard';

type MusicianCarouselProps = {
  items: MusicianCardType[];
};

export function MusicianCarousel({ items }: MusicianCarouselProps) {
  return (
    <View className="mb-8">
      <View className="px-5">
        <SectionHeader
          title="Apoie músicos"
          highlight="locais"
          icon={<FontAwesome name="handshake-o" size={18} color="#1B1B1B" />}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
      >
        {items.map((item) => (
          <MusicianPortraitCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
