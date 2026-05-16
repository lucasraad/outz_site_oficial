import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ProfileBackButton() {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => router.back()}
      className="absolute left-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/25"
      style={{ top: insets.top + 8 }}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
    >
      <FontAwesome name="chevron-left" size={16} color="#FFFFFF" />
    </Pressable>
  );
}
