import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-warm px-5" style={{ paddingTop: insets.top + 16 }}>
      <Text className="text-h1 font-bold text-content-primary">Perfil</Text>
      <Text className="mt-2 text-body text-content-secondary">
        O acesso por conta está em desenvolvimento. Você já pode explorar os perfis de demonstração e salvar favoritos neste dispositivo.
      </Text>
      <View className="mt-8 gap-3">
        <Button label="Entrar — em breve" disabled fullWidth />
        <Button label="Criar conta — em breve" variant="outline" disabled fullWidth />
      </View>
    </View>
  );
}
