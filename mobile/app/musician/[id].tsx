import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { MusicianInfoPanel } from '@/components/screens/musician/MusicianInfoPanel';
import { MusicianPostsGrid } from '@/components/screens/musician/MusicianPostsGrid';
import { ProfileBackButton } from '@/components/screens/shared/ProfileBackButton';
import { ProfileTabBar, type ProfileTabKey } from '@/components/screens/shared/ProfileTabBar';
import { Button } from '@/components/ui';
import { useAppStore } from '@/store/appStore';
import { useMusicianProfile } from '@/services/musicians';
import { useLocalSearchParams } from 'expo-router';

export default function MusicianProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: profile, isLoading, isError } = useMusicianProfile(id ?? '');
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('posts');

  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const favoriteKey = `musician:${id}`;
  const isFavorite = useAppStore((s) => s.isFavorite(favoriteKey));
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-warm">
        <ActivityIndicator size="large" color="#FF541B" />
      </View>
    );
  }

  if (isError || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-background-warm px-6">
        <Text className="text-center text-h3 font-bold text-content-primary">
          Artista não encontrado
        </Text>
        <ProfileBackButton />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-warm">
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <View className="relative">
          <ImageBackground
            source={{ uri: profile.coverImage }}
            className="h-52 w-full"
            resizeMode="cover"
          >
            <View className="absolute inset-0 bg-black/45" />
          </ImageBackground>
          <ProfileBackButton />

          <View className="-mt-14 items-center">
            <Image
              source={{ uri: profile.avatarImage }}
              className="h-28 w-28 rounded-full border-4 border-background-warm"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="mt-3 px-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 items-center">
              <Text className="text-center text-h1 font-bold text-content-primary">
                {profile.name}
              </Text>
              <Text className="mt-1 text-center text-body-sm text-content-secondary">
                {profile.location}
              </Text>
            </View>
            <Button
              label={isFavorite ? 'Remover favorito' : 'Favoritar'}
              disabled={!hasHydrated}
              variant="outline"
              size="sm"
              onPress={() => toggleFavorite(favoriteKey)}
              className={isFavorite ? 'border-primary bg-primary-muted' : undefined}
            />
          </View>
        </View>

        <View className="mt-6">
          <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </View>

        {activeTab === 'posts' ? (
          <MusicianPostsGrid posts={profile.posts} />
        ) : (
          <MusicianInfoPanel profile={profile} />
        )}
      </ScrollView>
    </View>
  );
}
