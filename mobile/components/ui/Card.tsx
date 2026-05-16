import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type CardProps = ViewProps & {
  className?: string;
  padded?: boolean;
};

export function Card({ children, className, padded = true, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-card bg-background',
        padded && 'p-4',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}
