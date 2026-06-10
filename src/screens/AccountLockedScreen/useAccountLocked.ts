import { router, useLocalSearchParams } from 'expo-router';
import { getParam } from 'utils';
import { ROUTES } from '@constants';
import type { AccountLockedParams } from './types';

export function useAccountLocked() {
  const params = useLocalSearchParams<Record<string, string>>();
  const lockedUntil = getParam(params.lockedUntil);
  const supportReference = getParam(params.supportReference);

  const lockedUntilDate = lockedUntil
    ? new Date(lockedUntil).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'unknown';

  const handleGoBack = () => router.replace(ROUTES.login);

  return { lockedUntilDate, supportReference, handleGoBack };
}