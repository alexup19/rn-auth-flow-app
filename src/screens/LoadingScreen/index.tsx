import { ActivityIndicator, Text, View } from 'react-native';
import { Button } from 'components';
import { styles } from './styles';
import { useLoading } from './useLoading';

export function LoadingScreen() {
  const { isError, refetch, isFetching } = useLoading();

  if (isError) {
    return (
      <View className={styles.errorContainer}>
        <Text className={styles.errorTitle}>Something went wrong</Text>
        <Text className={styles.errorDescription}>
          Unable to load your account status. Please try again.
        </Text>
        <Button
          label="Try again"
          onPress={() => refetch()}
          loading={isFetching}
          disabled={isFetching}
        />
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className={styles.loadingText}>Loading your account…</Text>
    </View>
  );
}