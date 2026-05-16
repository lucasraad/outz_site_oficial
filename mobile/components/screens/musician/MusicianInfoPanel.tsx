import { Text, View } from 'react-native';

import { Chip } from '@/components/ui';
import type { MusicianProfile } from '@/services/musicians';

type MusicianInfoPanelProps = {
  profile: MusicianProfile;
};

export function MusicianInfoPanel({ profile }: MusicianInfoPanelProps) {
  return (
    <View className="gap-6 px-5 pb-10 pt-4">
      {profile.bio ? (
        <View>
          <Text className="mb-2 text-caption font-bold uppercase tracking-wide text-content-primary">
            Sobre
          </Text>
          <Text className="text-body text-content-primary">{profile.bio}</Text>
        </View>
      ) : null}

      <View>
        <Text className="mb-2 text-caption font-bold uppercase tracking-wide text-content-primary">
          Estilos
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {profile.genres.map((genre) => (
            <Chip key={genre} label={genre} />
          ))}
        </View>
      </View>

      <View>
        <Text className="mb-1 text-caption font-bold uppercase tracking-wide text-content-primary">
          Localização
        </Text>
        <Text className="text-body text-content-secondary">{profile.location}</Text>
      </View>
    </View>
  );
}
