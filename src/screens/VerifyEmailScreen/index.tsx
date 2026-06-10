import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "components";
import { styles } from "./styles";
import { useVerifyEmail } from "./useVerifyEmail";

export function VerifyEmailScreen() {
  const { email, handleGoBack } = useVerifyEmail();

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inner}>
        <Text className={styles.title}>Verify your email</Text>
        <Text className={styles.description}>
          We sent a verification link to {email}. Check your inbox to continue.
        </Text>
        <View className={styles.button}>
          <Button label="Go back" onPress={handleGoBack} />
        </View>
      </View>
    </SafeAreaView>
  );
}
