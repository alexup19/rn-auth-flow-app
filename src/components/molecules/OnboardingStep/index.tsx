import { Text, View } from "react-native";
import { Badge } from "atoms";
import type { OnboardingStepProps } from "./types";
import { styles } from "./styles";

export function OnboardingStep({ step, label, status }: OnboardingStepProps) {
  return (
    <View className={styles.container}>
      <Badge step={step} status={status} />
      <Text className={styles.label(status)}>{label}</Text>
    </View>
  );
}
