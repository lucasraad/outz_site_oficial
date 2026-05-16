import { Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export function HomeSeViraSection() {
  return (
    <View className="mb-10 px-5">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="hand-peace-o" size={18} color="#1B1B1B" />
        <Text className="text-h2 font-bold text-content-primary">Se vira!</Text>
      </View>
      <Text className="mt-2 text-body-sm text-content-secondary">
        Dicas e oportunidades para você se organizar — em breve.
      </Text>
    </View>
  );
}
