import { router } from 'expo-router';
import { useAuthStore } from 'store/authStore';
import { useCustomerStatus } from 'hooks';
import { ROUTES } from '@constants';

export function useDashboard() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { refetch, isRefetching } = useCustomerStatus();

  const handleLogout = () => {
    clearAuth();
    router.replace(ROUTES.login);
  };

  return { user, refetch, isRefetching, handleLogout };
}