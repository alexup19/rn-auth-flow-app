import { router, useLocalSearchParams } from 'expo-router';
import { getParam } from 'utils';
import { ROUTES } from '@constants';

export function useMfa() {
  const params = useLocalSearchParams<Record<string, string>>();
  const maskedPhone = getParam(params.maskedPhone);

  const handleGoBack = () => router.replace(ROUTES.login);

  return { maskedPhone, handleGoBack };
}