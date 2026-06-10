import { useQuery } from '@tanstack/react-query';
import { mockCustomerStatusRequest } from 'api';
import { useAuthStore } from 'store/authStore';

export function useCustomerStatus() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['customerStatus', user?.id],
    queryFn: () => mockCustomerStatusRequest(token!, user!.id, user!.email),
    enabled: !!token && !!user,
    staleTime: 1000 * 60 * 5,
  });
}