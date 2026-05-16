import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  title: string;
  highlight?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  highlight,
  icon,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <View className={cn('mb-4 flex-row items-center justify-between', className)}>
      <View className="flex-1 flex-row items-center gap-2">
        {icon}
        <Text className="text-h2 font-bold text-content-primary">
          {title}
          {highlight ? (
            <Text className="text-h2 font-bold text-primary"> {highlight}</Text>
          ) : null}
        </Text>
      </View>
      {action}
    </View>
  );
}
