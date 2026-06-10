import { Pressable, Text } from "react-native";
import type { DemoAccountCardProps } from "./types";
import { styles } from "./styles";

export function DemoAccountCard({
  label,
  email,
  onPress,
}: DemoAccountCardProps) {
  return (
    <Pressable className={styles.container} onPress={onPress}>
      <Text className={styles.label}>{label}</Text>
      <Text className={styles.email}>{email}</Text>
    </Pressable>
  );
}
