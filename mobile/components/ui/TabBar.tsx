import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

export type TabItem<T extends string> = {
  key: T;
  label: string;
};

type TabBarProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
};

export function TabBar<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabBarProps<T>) {
  return (
    <View className={cn('flex-row border-b border-border-subtle', className)}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className="mr-6 pb-3"
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              className={cn(
                'text-body font-semibold',
                isActive ? 'text-primary' : 'text-content-secondary',
              )}
            >
              {tab.label}
            </Text>
            {isActive ? <View className="mt-2 h-1 rounded-full bg-primary" /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
