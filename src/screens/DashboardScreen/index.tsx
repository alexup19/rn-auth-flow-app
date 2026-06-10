import { Text, View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card } from "components";
import { styles } from "./styles";
import { useDashboard } from "./useDashboard";

export function DashboardScreen() {
  const { user, refetch, isRefetching, handleLogout } = useDashboard();

  return (
    <SafeAreaView className={styles.container}>
      <ScrollView
        contentContainerClassName={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <View className={styles.inner}>
          <View className={styles.header}>
            <Text className={styles.title}>Welcome, {user?.name} 👋</Text>
            <Text className={styles.subtitle}>
              Your account is fully set up and ready to go.
            </Text>
          </View>

          <Card>
            <Text className={styles.accountLabel}>Account</Text>
            <Text className={styles.accountName}>{user?.name}</Text>
            <Text className={styles.accountEmail}>{user?.email}</Text>
          </Card>
        </View>

        <View className={styles.button}>
          <Button label="Log out" onPress={handleLogout} variant="danger" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
