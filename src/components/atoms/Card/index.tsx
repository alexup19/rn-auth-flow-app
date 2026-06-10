import { View } from "react-native";
import type { CardProps } from "./types";
import { styles } from "./styles";

export function Card({ children }: CardProps) {
  return <View className={styles.container}>{children}</View>;
}
