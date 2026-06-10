import { useCallback, useState } from 'react';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { mockLoginRequest } from 'api';
import { useAuthStore } from 'store/authStore';
import { ROUTES } from '@constants';
import type { AuthFlowState, LoginCredentials } from 'types/auth';

export function useLogin() {
  const [flowState, setFlowState] = useState<AuthFlowState>({ phase: 'idle' });
  const setAuth = useAuthStore((s) => s.setAuth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setFlowState({ phase: 'loading' });

    try {
      const response = await mockLoginRequest(credentials);

      switch (response.status) {
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setAuth(response.token, response.user);
          router.replace(ROUTES.loading);
          break;

        case 'requires_mfa':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          router.push({
            pathname: ROUTES.mfa,
            params: { mfaToken: response.mfaToken, maskedPhone: response.maskedPhone },
          });
          break;

        case 'requires_password_reset':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          router.push({
            pathname: ROUTES.resetPassword,
            params: { resetToken: response.resetToken, reason: response.reason },
          });
          break;

        case 'pending_email_verification':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          router.push({
            pathname: ROUTES.verifyEmail,
            params: { email: response.email },
          });
          break;

        case 'account_locked':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          router.push({
            pathname: ROUTES.accountLocked,
            params: { lockedUntil: response.lockedUntil },
          });
          break;

        case 'invalid_credentials':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setFlowState({ phase: 'error', message: response.message });
          break;

        default: {
          const _exhaustive: never = response;
          return _exhaustive;
        }
      }
    } catch {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setFlowState({
        phase: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  }, [setAuth]);

  const reset = useCallback(() => setFlowState({ phase: 'idle' }), []);

  return { flowState, login, reset };
}