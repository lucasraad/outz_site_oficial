import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { cn } from '@/lib/cn';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: 'bg-primary active:bg-primary-dark',
  outline: 'border-2 border-primary bg-transparent active:bg-primary-muted',
  ghost: 'bg-transparent active:bg-primary-muted',
};

const variantTextClasses: Record<ButtonVariant, string> = {
  solid: 'text-content-inverse',
  outline: 'text-primary',
  ghost: 'text-primary',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 min-h-[36px]',
  md: 'px-5 py-3 min-h-[44px]',
  lg: 'px-6 py-4 min-h-[52px]',
};

const sizeTextClasses: Record<ButtonSize, string> = {
  sm: 'text-caption',
  md: 'text-button',
  lg: 'text-body',
};

export function Button({
  label,
  variant = 'solid',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center rounded-button',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'solid' ? '#FFFFFF' : '#FF541B'} />
      ) : (
        <Text
          className={cn(
            'font-semibold uppercase tracking-wide',
            variantTextClasses[variant],
            sizeTextClasses[size],
            textClassName,
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
