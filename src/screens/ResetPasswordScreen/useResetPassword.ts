import { router, useLocalSearchParams } from 'expo-router';
import { getParam } from 'utils';
import { ROUTES } from '@constants';

export function useResetPassword() {
  const params = useLocalSearchParams<Record<string, string>>();
  const reason = getParam(params.reason);

  const handleGoBack = () => router.replace(ROUTES.login);

  return { reason, handleGoBack };
}