import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { EstablishmentInfoPanel } from '@/components/screens/establishment/EstablishmentInfoPanel';
import { EstablishmentStatusBar } from '@/components/screens/establishment/EstablishmentStatusBar';
import { ProfileBackButton } from '@/components/screens/shared/ProfileBackButton';
import { ProfileTabBar, type ProfileTabKey } from '@/components/screens/shared/ProfileTabBar';
import { Button } from '@/components/ui';
import { useEstablishmentProfile } from '@/services/establishments';
import { useAppStore } from '@/store/appStore';
import { useLocalSearchParams } from 'expo-router';

export default function EstablishmentProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: profile, isLoading, isError } = useEstablishmentProfile(id ?? '');
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('info');

  const favoriteKey = `establishment:${id}`;
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
          Estabelecimento não encontrado
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
            className="h-56 w-full"
            resizeMode="cover"
          >
            <View className="absolute inset-0 bg-black/5" />
          </ImageBackground>
          <ProfileBackButton />

          <View className="-mt-12 items-center">
            <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background-warm bg-surface-dark">
              {profile.logoImage ? (
                <Image
                  source={{ uri: profile.logoImage }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-caption font-bold text-content-inverse">
                  {profile.name.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </View>
          </View>
        </View>

        <EstablishmentStatusBar status={profile.status} label={profile.statusLabel} />

        <View className="rounded-b-none bg-background-warm px-5 pt-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-h1 font-bold text-content-primary">{profile.name}</Text>
              <Text className="mt-1 text-body-sm text-content-secondary">{profile.location}</Text>
            </View>
            <Button
              label="Favoritar"
              variant="outline"
              size="sm"
              onPress={() => toggleFavorite(favoriteKey)}
              className={isFavorite ? 'border-primary bg-primary-muted' : undefined}
            />
          </View>

          <View className="mt-6">
            <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </View>

          {activeTab === 'info' ? (
            <EstablishmentInfoPanel profile={profile} />
          ) : (
            <Text className="py-8 text-center text-body text-content-secondary">
              Publicações em breve.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
