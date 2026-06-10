import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "components";
import { styles } from "./styles";
import { useAccountLocked } from "./useAccountLocked";

export function AccountLockedScreen() {
  const { lockedUntilDate, supportReference, handleGoBack } =
    useAccountLocked();

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inner}>
        <Text className={styles.title}>Account locked</Text>
        <Text className={styles.description}>
          Your account has been temporarily locked until {lockedUntilDate}.
        </Text>
        <Text className={styles.reference}>Reference: {supportReference}</Text>
        <View className={styles.button}>
          <Button label="Go back" onPress={handleGoBack} />
        </View>
      </View>
    </SafeAreaView>
  );
}
