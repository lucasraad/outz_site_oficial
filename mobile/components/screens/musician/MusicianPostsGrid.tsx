import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, Text, View } from 'react-native';

import type { MusicianPost } from '@/services/musicians';

type MusicianPostsGridProps = {
  posts: MusicianPost[];
};

export function MusicianPostsGrid({ posts }: MusicianPostsGridProps) {
  if (posts.length === 0) {
    return (
      <Text className="py-8 text-center text-body text-content-secondary">
        Nenhuma publicação ainda.
      </Text>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-2 px-4 pb-8">
      {posts.map((post) => (
        <Pressable
          key={post.id}
          className="aspect-[3/4] w-[31%] overflow-hidden rounded-card"
          accessibilityRole="button"
          accessibilityLabel={`Publicação em ${post.venueName}`}
        >
          <Image source={{ uri: post.image }} className="h-full w-full" resizeMode="cover" />
          <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-black/55 px-2 py-2">
            <Text className="flex-1 text-caption font-semibold text-content-inverse" numberOfLines={1}>
              {post.venueName}
            </Text>
            <View className="ml-1 flex-row items-center gap-1">
              <FontAwesome name="heart" size={10} color="#FFFFFF" />
              <Text className="text-caption text-content-inverse">{post.likes}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
