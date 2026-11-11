import { ImageBackground, Text, View } from 'react-native';

import { Button } from '@/components/ui';
import { formatEventSchedule } from '@/lib/eventDate';
import type { EventDetail } from '@/types/event';

type Props = {
  event: EventDetail;
  onArtistPress: (id: string) => void;
  onVenuePress: (id: string) => void;
};

export function EventDetails({ event, onArtistPress, onVenuePress }: Props) {
  const schedule = formatEventSchedule(event);
  return (
    <View>
      <ImageBackground source={{ uri: event.coverImage }} className="h-52 justify-end bg-surface-dark" resizeMode="cover" accessible={false}>
        <View className="mb-4 ml-5 self-start rounded-full bg-background-warm px-4 py-2">
          <Text className="text-caption font-bold text-content-primary">DEMONSTRAÇÃO</Text>
        </View>
      </ImageBackground>
      <View className="gap-6 px-5 py-6">
        <View>
          <Text accessibilityRole="header" className="text-h1 font-bold text-content-primary">{event.title}</Text>
          <Text className="mt-2 text-body-sm text-content-secondary">{event.venue.cityLabel}</Text>
          <Text className="mt-3 text-caption text-content-secondary">
            Dados fictícios para testar o aplicativo. Esta programação não é uma oferta real de evento.
          </Text>
        </View>
        <View className="gap-2 rounded-xl bg-white p-4">
          <Text accessibilityRole="header" className="text-h3 font-bold text-content-primary">Quando</Text>
          <Text className="text-body text-content-primary">{schedule.dateLabel}</Text>
          <Text className="text-body text-content-primary">{schedule.timeLabel}</Text>
          <Text className="text-caption text-content-secondary">Horário de Brasília</Text>
        </View>
        <View>
          <Text accessibilityRole="header" className="text-h3 font-bold text-content-primary">Sobre a apresentação</Text>
          <Text className="mt-3 text-body text-content-secondary">{event.description}</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {event.genres.map((genre) => (
              <View key={genre} className="rounded-full bg-primary-muted px-3 py-2">
                <Text className="text-caption text-content-primary">{genre}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="gap-3">
          <Text accessibilityRole="header" className="text-h3 font-bold text-content-primary">Quem toca</Text>
          {event.artists.map((artist) => (
            <View key={artist.id} className="gap-3 rounded-xl bg-white p-4">
              <Text className="text-body font-bold text-content-primary">{artist.name}</Text>
              <Button label="Ver artista" variant="outline" accessibilityLabel={`Ver artista ${artist.name}`} onPress={() => onArtistPress(artist.id)} fullWidth />
            </View>
          ))}
        </View>
        <View className="gap-3 rounded-xl bg-white p-4">
          <Text accessibilityRole="header" className="text-h3 font-bold text-content-primary">Onde acontece</Text>
          <Text className="text-body font-bold text-content-primary">{event.venue.name}</Text>
          <Text className="text-body-sm text-content-secondary">{event.venue.address}</Text>
          <Button label="Ver estabelecimento" accessibilityLabel={`Ver estabelecimento ${event.venue.name}`} onPress={() => onVenuePress(event.venue.id)} fullWidth />
        </View>
        <View className="gap-2">
          <Text accessibilityRole="header" className="text-h3 font-bold text-content-primary">Entrada</Text>
          <Text className="text-body font-bold text-content-primary">{event.entry.label}</Text>
          <Text className="text-body-sm text-content-secondary">{event.entry.details}</Text>
        </View>
      </View>
    </View>
  );
}
