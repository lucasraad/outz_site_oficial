import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import Svg, { ClipPath, Defs, G, Line, Polygon, Image as SvgImage } from 'react-native-svg';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Button } from '@/components/ui';
import type { MatchItem } from '@/services/home';

const CARD_WIDTH = 272;
const CARD_HEIGHT = 300;

type DiagonalMatchCardProps = {
  item: MatchItem;
  active?: boolean;
};

export function DiagonalMatchCard({ item, active = false }: DiagonalMatchCardProps) {
  const splitY = CARD_HEIGHT * 0.56;
  const musicianPoints = `0,0 ${CARD_WIDTH},0 ${CARD_WIDTH},${splitY * 0.35} 0,${splitY}`;
  const venuePoints = `0,${splitY} ${CARD_WIDTH},${splitY * 0.35} ${CARD_WIDTH},${CARD_HEIGHT} 0,${CARD_HEIGHT}`;

  const openDetails = () => {
    router.push({
      pathname: '/event/[id]',
      params: { id: item.eventId },
    });
  };

  return (
    <View
      className="overflow-hidden rounded-[22px] bg-surface-dark shadow-lg"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transform: [{ scale: active ? 1 : 0.9 }],
        opacity: active ? 1 : 0.88,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: active ? 0.22 : 0.12,
        shadowRadius: 16,
        elevation: active ? 10 : 4,
      }}
    >
      <Svg width={CARD_WIDTH} height={CARD_HEIGHT}>
        <Defs>
          <ClipPath id={`musician-${item.id}`}>
            <Polygon points={musicianPoints} />
          </ClipPath>
          <ClipPath id={`venue-${item.id}`}>
            <Polygon points={venuePoints} />
          </ClipPath>
        </Defs>
        <G clipPath={`url(#musician-${item.id})`}>
          <SvgImage
            href={item.musicianImage}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            preserveAspectRatio="xMidYMid slice"
          />
        </G>
        <G clipPath={`url(#venue-${item.id})`}>
          <SvgImage
            href={item.venueImage}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            preserveAspectRatio="xMidYMid slice"
          />
        </G>
        <Line
          x1={0}
          y1={splitY}
          x2={CARD_WIDTH}
          y2={splitY * 0.35}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth={2.5}
        />
      </Svg>

      <View className="absolute left-3 top-3 max-w-[58%]">
        <Text className="text-body-sm font-bold text-content-inverse" numberOfLines={1}>
          {item.musicianName}
        </Text>
        <Text className="mt-0.5 text-caption text-content-inverse/90" numberOfLines={2}>{item.dateLabel}</Text>
        <Text className="text-caption text-content-inverse/80">{item.musicianGenre}</Text>
      </View>

      <View className="absolute bottom-14 right-3 max-w-[58%] items-end">
        <Text className="text-right text-body-sm font-bold text-content-inverse" numberOfLines={1}>
          {item.venueName}
        </Text>
        <Text className="mt-0.5 text-right text-caption text-content-inverse/90" numberOfLines={2}>
          {item.timeSlot}
        </Text>
        <Text className="text-right text-caption text-content-inverse/80">
          {item.venueCategory} · {item.distance}
        </Text>
      </View>

      <Pressable
        onPress={openDetails}
        className="absolute inset-0 z-10"
        accessibilityRole="button"
        accessibilityLabel={`Ver evento ${item.eventTitle}`}
      />
      <View
        pointerEvents="none"
        className="absolute z-10 h-9 w-9 items-center justify-center rounded-full bg-primary"
        style={{
          top: splitY - 22,
          left: CARD_WIDTH / 2 - 18,
        }}
      >
        <FontAwesome name="plus" size={14} color="#FFFFFF" />
      </View>

      {active ? (
        <View pointerEvents="box-none" className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-6">
          <View className="absolute inset-0 bg-black/45" />
          <Button label="Ver evento" size="sm" fullWidth onPress={openDetails} />
        </View>
      ) : null}
    </View>
  );
}

export const MATCH_CARD_WIDTH = CARD_WIDTH;
export const MATCH_CARD_SNAP = CARD_WIDTH + 16;
