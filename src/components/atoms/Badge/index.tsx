import { Text, View } from 'react-native';
import type { BadgeProps } from './types';
import { styles } from './styles';

export function Badge({ status, step }: BadgeProps) {
  const label = status === 'completed' ? '✓' : String(step);

  return (
    <View className={styles.container(status)}>
      <Text className={styles.text(status)}>{label}</Text>
    </View>
  );
}