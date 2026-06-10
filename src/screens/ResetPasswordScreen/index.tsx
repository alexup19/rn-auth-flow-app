import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "components";
import { styles } from "./styles";
import { useResetPassword } from "./useResetPassword";

export function ResetPasswordScreen() {
  const { reason, handleGoBack } = useResetPassword();

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inner}>
        <Text className={styles.title}>Reset your password</Text>
        <Text className={styles.description}>
          {reason === "expired"
            ? "Your password has expired and must be updated."
            : "Please set a password to continue."}
        </Text>
        <View className={styles.button}>
          <Button label="Go back" onPress={handleGoBack} />
        </View>
      </View>
    </SafeAreaView>
  );
}
