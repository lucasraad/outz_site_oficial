import { useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { SectionHeader } from '@/components/ui';
import type { MatchItem } from '@/services/home';

import { DiagonalMatchCard, MATCH_CARD_SNAP } from './DiagonalMatchCard';

type MatchCarouselProps = {
  items: MatchItem[];
};

function DoubleHeartIcon() {
  return (
    <View className="flex-row">
      <FontAwesome name="heart" size={16} color="#1B1B1B" style={{ marginRight: -6 }} />
      <FontAwesome name="heart" size={16} color="#1B1B1B" />
    </View>
  );
}

export function MatchCarousel({ items }: MatchCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(Math.min(1, Math.max(items.length - 1, 0)));

  useEffect(() => {
    if (items.length > 1) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollTo({ x: MATCH_CARD_SNAP, animated: false });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / MATCH_CARD_SNAP);
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const next = Math.min(Math.max(index, 0), items.length - 1);
    scrollRef.current?.scrollTo({ x: next * MATCH_CARD_SNAP, animated: true });
    setActiveIndex(next);
  };

  return (
    <View className="mb-10">
      <View className="px-5">
        <SectionHeader
          title="Match"
          highlight="perfeito"
          icon={<DoubleHeartIcon />}
        />
      </View>

      <View className="relative">
        <Pressable
          onPress={() => scrollToIndex(activeIndex - 1)}
          className="absolute left-2 top-[40%] z-20 h-8 w-8 items-center justify-center rounded-full bg-black/10"
          accessibilityLabel="Anterior"
        >
          <FontAwesome name="chevron-left" size={12} color="#1B1B1B" />
        </Pressable>

        <Pressable
          onPress={() => scrollToIndex(activeIndex + 1)}
          className="absolute right-2 top-[40%] z-20 h-8 w-8 items-center justify-center rounded-full bg-black/10"
          accessibilityLabel="Próximo"
        >
          <FontAwesome name="chevron-right" size={12} color="#1B1B1B" />
        </Pressable>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={MATCH_CARD_SNAP}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {items.map((item, index) => (
            <View key={item.id} style={{ marginRight: index < items.length - 1 ? 16 : 0 }}>
              <DiagonalMatchCard item={item} active={index === activeIndex} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
