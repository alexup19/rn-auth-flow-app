import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

type BiometricState = 'idle' | 'checking' | 'unlocked' | 'failed' | 'unavailable';

export function useBiometricUnlock() {
  const [state, setState] = useState<BiometricState>('idle');

  useEffect(() => {
    authenticate();
  }, []);

  async function authenticate() {
    setState('checking');

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      setState('unavailable');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirm your identity to continue',
      fallbackLabel: 'Use passcode',
    });

    setState(result.success ? 'unlocked' : 'failed');
  }

  return {
    isChecking: state === 'checking',
    isUnlocked: state === 'unlocked',
    isUnavailable: state === 'unavailable',
    isFailed: state === 'failed',
    retry: authenticate,
  };
}