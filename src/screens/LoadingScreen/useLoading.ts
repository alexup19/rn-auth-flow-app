import { useEffect } from 'react';
import { router } from 'expo-router';
import { useCustomerStatus } from 'hooks';
import { ROUTES } from '@constants';

export function useLoading() {
  const { data, isError, refetch, isFetching } = useCustomerStatus();

  useEffect(() => {
    if (!data) return;

    switch (data.status) {
      case 'onboarded':
        router.replace(ROUTES.dashboard);
        break;
      case 'in_progress':
        router.replace(ROUTES.onboarding);
        break;
      case 'rejected':
        router.replace({
          pathname: ROUTES.onboarding,
          params: {
            rejected: 'true',
            reason: data.reason,
            supportReference: data.supportReference,
          },
        });
        break;
    }
  }, [data]);

  return { isError, refetch, isFetching };
}