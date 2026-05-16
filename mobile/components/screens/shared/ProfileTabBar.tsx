import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

export type ProfileTabKey = 'posts' | 'info';

const TABS: { key: ProfileTabKey; label: string }[] = [
  { key: 'posts', label: 'Publicações' },
  { key: 'info', label: 'Informações' },
];

type ProfileTabBarProps = {
  activeTab: ProfileTabKey;
  onTabChange: (tab: ProfileTabKey) => void;
};

export function ProfileTabBar({ activeTab, onTabChange }: ProfileTabBarProps) {
  return (
    <View className="flex-row justify-center border-b border-border-subtle">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className="mx-5 pb-3"
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              className={cn(
                'text-center text-body font-semibold',
                isActive ? 'text-primary' : 'text-content-secondary',
              )}
            >
              {tab.label}
            </Text>
            {isActive ? (
              <View className="mx-auto mt-2 h-1 w-full min-w-[80px] rounded-full bg-primary" />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
