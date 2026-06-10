import { renderHook, act } from '@testing-library/react-native';
import { useLogin } from 'hooks';

jest.mock('api/mockAuthApi', () => ({
  mockLoginRequest: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

jest.mock('store/authStore', () => ({
  useAuthStore: jest.fn((selector) =>
    selector({
      token: null,
      user: null,
      _hydrated: true,
      setAuth: jest.fn(),
      clearAuth: jest.fn(),
      setHydrated: jest.fn(),
    })
  ),
}));

const { mockLoginRequest } = require('api');
const { router } = require('expo-router');

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with idle phase', () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.flowState.phase).toBe('idle');
  });

  it('sets loading phase while request is in flight', async () => {
    mockLoginRequest.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.login({ email: 'user@example.com', password: 'password' });
    });

    expect(result.current.flowState.phase).toBe('loading');
  });

  it('navigates to loading on success', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'success',
      token: 'mock-token',
      user: { id: 'usr_001', email: 'user@example.com', name: 'Demo User' },
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'user@example.com', password: 'password' });
    });

    expect(router.replace).toHaveBeenCalledWith('/(auth)/loading');
  });

  it('sets error phase on invalid credentials', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'invalid_credentials',
      message: 'Invalid email or password.',
      attemptsRemaining: 3,
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'wrong@example.com', password: 'wrong' });
    });

    expect(result.current.flowState.phase).toBe('error');
    if (result.current.flowState.phase === 'error') {
      expect(result.current.flowState.message).toBe('Invalid email or password.');
    }
  });

  it('navigates to mfa screen on requires_mfa', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'requires_mfa',
      mfaToken: 'mock-mfa-token',
      maskedPhone: '***-***-4521',
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'mfa@example.com', password: 'password' });
    });

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/(flow)/mfa' })
    );
  });

  it('navigates to reset password screen on requires_password_reset', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'requires_password_reset',
      resetToken: 'mock-reset-token',
      reason: 'expired',
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'reset@example.com', password: 'password' });
    });

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/(flow)/reset-password' })
    );
  });

  it('navigates to verify email screen on pending_email_verification', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'pending_email_verification',
      email: 'verify@example.com',
      resendAvailableInSeconds: 60,
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'verify@example.com', password: 'password' });
    });

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/(flow)/verify-email' })
    );
  });

  it('navigates to account locked screen on account_locked', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'account_locked',
      lockedUntil: new Date().toISOString(),
      supportReference: 'SUP-2026-0042',
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'locked@example.com', password: 'password' });
    });

    expect(router.push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/(flow)/account-locked' })
    );
  });

  it('sets error phase on network failure', async () => {
    mockLoginRequest.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'user@example.com', password: 'password' });
    });

    expect(result.current.flowState.phase).toBe('error');
  });

  it('resets flow state on reset()', async () => {
    mockLoginRequest.mockResolvedValue({
      status: 'invalid_credentials',
      message: 'Invalid email or password.',
      attemptsRemaining: 3,
    });

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.login({ email: 'wrong@example.com', password: 'wrong' });
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.flowState.phase).toBe('idle');
  });
});