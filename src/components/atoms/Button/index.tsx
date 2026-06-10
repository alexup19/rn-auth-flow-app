import { ActivityIndicator, Pressable, Text } from "react-native";
import type { ButtonProps } from "./types";
import { variantStyles } from "./styles";

export function Button({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const styles = variantStyles[variant];

  return (
    <Pressable
      className={`items-center rounded-[10px] py-3.5 ${styles.container} ${
        disabled || loading ? "opacity-70" : ""
      }`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#0f172a"} />
      ) : (
        <Text className={`text-base font-semibold ${styles.text}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
