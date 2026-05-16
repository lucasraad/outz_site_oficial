import type { ReactNode } from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';

import type { EstablishmentProfile } from '@/services/establishments';

type EstablishmentInfoPanelProps = {
  profile: EstablishmentProfile;
};

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-caption font-bold uppercase tracking-wide text-content-primary">
        {title}
      </Text>
      {children}
    </View>
  );
}

export function EstablishmentInfoPanel({ profile }: EstablishmentInfoPanelProps) {
  const { hours, contact, address, otherInfo } = profile;

  return (
    <View className="px-5 pb-10 pt-4">
      <InfoSection title="Horário de funcionamento">
        <Text className="text-body font-semibold text-primary">{hours.statusText}</Text>
        {hours.nextOpen ? (
          <Text className="mt-1 text-body-sm text-content-secondary">{hours.nextOpen}</Text>
        ) : null}
        <Text className="mt-3 text-body-sm leading-6 text-content-primary">{hours.schedule}</Text>
      </InfoSection>

      <InfoSection title="Contato">
        <Pressable onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\D/g, '')}`)}>
          <Text className="text-body text-content-primary">{contact.phone}</Text>
        </Pressable>
      </InfoSection>

      <InfoSection title="Endereço">
        <Text className="text-body-sm leading-6 text-content-primary">{address.street}</Text>
        <View className="mt-3 overflow-hidden rounded-card">
          <Image
            source={{ uri: address.mapPreview }}
            className="h-40 w-full"
            resizeMode="cover"
            accessibilityLabel="Prévia do mapa"
          />
        </View>
      </InfoSection>

      <InfoSection title="Outras informações">
        <Text className="text-body-sm text-content-secondary">CNPJ</Text>
        <Text className="text-body text-content-primary">{otherInfo.cnpj}</Text>
      </InfoSection>
    </View>
  );
}
