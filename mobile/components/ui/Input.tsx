import { TextInput, View, Text, type TextInputProps } from 'react-native';

import { cn } from '@/lib/cn';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
};

export function Input({
  label,
  error,
  containerClassName,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label ? (
        <Text className="mb-2 text-body-sm font-semibold text-content-primary">{label}</Text>
      ) : null}
      <TextInput
        placeholderTextColor="#999999"
        className={cn(
          'min-h-[48px] rounded-button border border-border bg-background px-4 text-body text-content-primary',
          error && 'border-semantic-error',
          inputClassName,
        )}
        {...props}
      />
      {error ? (
        <Text className="mt-1 text-caption text-semantic-error">{error}</Text>
      ) : null}
    </View>
  );
}
