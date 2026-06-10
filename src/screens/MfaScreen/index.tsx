import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "components";
import { styles } from "./styles";
import { useMfa } from "./useMfa";

export function MfaScreen() {
  const { maskedPhone, handleGoBack } = useMfa();

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inner}>
        <Text className={styles.title}>Two-factor authentication</Text>
        <Text className={styles.description}>
          A verification code was sent to {maskedPhone}.
        </Text>
        <View className={styles.button}>
          <Button label="Go back" onPress={handleGoBack} />
        </View>
      </View>
    </SafeAreaView>
  );
}
