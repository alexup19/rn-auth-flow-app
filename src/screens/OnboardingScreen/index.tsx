import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, OnboardingStep } from "components";
import { styles } from "./styles";
import { useOnboarding } from "./useOnboarding";

export function OnboardingScreen() {
  const { handleLogout, handleUploadDocument } = useOnboarding();

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inner}>
        <View className={styles.header}>
          <Text className={styles.title}>Finish setting up</Text>
          <Text className={styles.subtitle}>
            Complete the steps below to activate your account.
          </Text>
        </View>

        <Card>
          <Text className={styles.stepLabel}>Step 2 of 4</Text>
          <OnboardingStep step={1} label="Create account" status="completed" />
          <OnboardingStep
            step={2}
            label="Verify your identity"
            status="active"
          />
          <OnboardingStep
            step={3}
            label="Link your bank account"
            status="pending"
          />
          <OnboardingStep
            step={4}
            label="Review and confirm"
            status="pending"
          />
        </Card>

        <View className={styles.continueButton}>
          <Button
            label="Upload identity document"
            onPress={handleUploadDocument}
          />
        </View>

        <View className={styles.logoutButton}>
          <Button label="Log out" onPress={handleLogout} variant="danger" />
        </View>
      </View>
    </SafeAreaView>
  );
}
