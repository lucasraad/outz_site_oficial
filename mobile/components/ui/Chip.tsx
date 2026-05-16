import { Pressable, Text, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';

type ChipProps = PressableProps & {
  label: string;
  selected?: boolean;
  className?: string;
};

export function Chip({ label, selected = false, className, ...props }: ChipProps) {
  return (
    <Pressable
      className={cn(
        'rounded-pill border px-4 py-2',
        selected ? 'border-primary bg-primary-muted' : 'border-border bg-background',
        className,
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-body-sm font-medium',
          selected ? 'text-primary' : 'text-content-secondary',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
