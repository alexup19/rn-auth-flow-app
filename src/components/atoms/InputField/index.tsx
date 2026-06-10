import { Text, TextInput, View } from "react-native";
import type { InputFieldProps } from "./types";
import { styles } from "./styles";

export function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <View className="mt-2">
      <Text className={styles.label}>{label}</Text>
      <TextInput
        className={styles.input}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error && <Text className={styles.error}>{error}</Text>}
    </View>
  );
}
