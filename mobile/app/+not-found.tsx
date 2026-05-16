import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <View className="flex-1 items-center justify-center bg-background-warm px-5">
        <Text className="text-h2 font-bold text-content-primary">Tela não encontrada</Text>
        <Link href="/" className="mt-4">
          <Text className="text-body font-semibold text-primary">Voltar ao início</Text>
        </Link>
      </View>
    </>
  );
}
