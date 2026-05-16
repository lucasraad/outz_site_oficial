import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip, Input } from '@/components/ui';

const GENRES = ['Rock', 'Samba', 'Sertanejo', 'MPB', 'Eletrônico', 'Gospel'];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-warm" style={{ paddingTop: insets.top }}>
      <ScrollView className="flex-1 px-5" contentContainerClassName="pb-8">
        <Text className="mt-4 text-h1 font-bold text-content-primary">Explorar</Text>
        <Text className="mt-1 text-body text-content-secondary">
          Descubra o som que combina com você
        </Text>

        <View className="mt-6">
          <Input placeholder="Buscar artistas, bares, eventos..." />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerClassName="gap-2"
        >
          {GENRES.map((genre, index) => (
            <Chip key={genre} label={genre} selected={index === 0} />
          ))}
        </ScrollView>

        <Text className="mt-8 text-body text-content-secondary">
          Eventos e artistas aparecerão aqui conforme a API for conectada.
        </Text>
      </ScrollView>
    </View>
  );
}
