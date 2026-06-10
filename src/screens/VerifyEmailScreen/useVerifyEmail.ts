import { router, useLocalSearchParams } from 'expo-router';
import { getParam } from 'utils';
import { ROUTES } from '@constants';

export function useVerifyEmail() {
  const params = useLocalSearchParams<Record<string, string>>();
  const email = getParam(params.email);

  const handleGoBack = () => router.replace(ROUTES.login);

  return { email, handleGoBack };
}