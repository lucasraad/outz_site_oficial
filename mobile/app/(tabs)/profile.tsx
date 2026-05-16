import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-warm px-5" style={{ paddingTop: insets.top + 16 }}>
      <Text className="text-h1 font-bold text-content-primary">Perfil</Text>
      <Text className="mt-2 text-body text-content-secondary">
        Entre para favoritar artistas, acompanhar eventos e gerenciar seu estabelecimento.
      </Text>
      <View className="mt-8 gap-3">
        <Button label="Entrar" fullWidth />
        <Button label="Criar conta" variant="outline" fullWidth />
      </View>
    </View>
  );
}
