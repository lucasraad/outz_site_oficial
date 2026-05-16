import { Text, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type BadgeVariant = 'live' | 'soon' | 'default';

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  live: 'bg-semantic-info',
  soon: 'border border-border bg-background/90',
  default: 'bg-primary-muted',
};

const variantTextClasses: Record<BadgeVariant, string> = {
  live: 'text-content-inverse',
  soon: 'text-content-primary',
  default: 'text-primary',
};

export function Badge({ label, variant = 'default', className, ...props }: BadgeProps) {
  return (
    <View
      className={cn('rounded-pill px-3 py-1', variantClasses[variant], className)}
      {...props}
    >
      <Text
        className={cn('text-caption font-semibold', variantTextClasses[variant])}
      >
        {label}
      </Text>
    </View>
  );
}
