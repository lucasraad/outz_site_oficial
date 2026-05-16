import { Text, View } from 'react-native';

import type { EstablishmentProfile } from '@/services/establishments';

type EstablishmentStatusBarProps = {
  status: EstablishmentProfile['status'];
  label: string;
};

export function EstablishmentStatusBar({ status, label }: EstablishmentStatusBarProps) {
  const isOpen = status === 'open';

  return (
    <View
      className={
        isOpen
          ? 'items-center rounded-t-sheet bg-semantic-success py-3'
          : 'items-center rounded-t-sheet bg-primary py-3'
      }
    >
      <Text className="text-body font-bold uppercase tracking-wide text-content-inverse">
        {label}
      </Text>
    </View>
  );
}
