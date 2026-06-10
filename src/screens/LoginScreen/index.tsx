import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, InputField, DemoAccountCard, Card } from "components";
import { styles } from "./styles";
import { useLoginScreen } from "./useLoginScreen";
import { DEMO_ACCOUNTS } from "./types";

export function LoginScreen() {
  const {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    handleSubmit,
    fillDemoAccount,
  } = useLoginScreen();

  return (
    <SafeAreaView className={styles.container}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center p-6"
          keyboardShouldPersistTaps="handled"
        >
          <View className={styles.header}>
            <Text className={styles.title}>Test MA</Text>
            <Text className={styles.subtitle}>Sign in to your account</Text>
          </View>

          <Card>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@example.com"
              editable={!isLoading}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              editable={!isLoading}
              error={errorMessage}
            />

            <View className={styles.buttonWrapper}>
              <Button
                label="Sign in"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </Card>

          <View className={styles.demoSection}>
            <Text className={styles.demoTitle}>
              Demo accounts (password: password)
            </Text>
            {DEMO_ACCOUNTS.map((account) => (
              <DemoAccountCard
                key={account.email}
                label={account.label}
                email={account.email}
                onPress={() => fillDemoAccount(account.email)}
              />
            ))}
          </View>

          {isLoading && <Text className={styles.loadingText}>Signing in…</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
