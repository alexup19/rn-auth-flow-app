import type { LoginCredentials, LoginResponse } from 'types/auth';

const MOCK_DELAY_MS = 800;

/**
 * Mock login endpoint. Use these demo accounts to simulate different response statuses:
 *
 * | Email                      | Password   | Status                      |
 * |----------------------------|------------|-----------------------------|
 * | user@example.com           | password   | success (onboarded)         |
 * | onboarding@example.com     | password   | success (in_progress)       |
 * | rejected@example.com       | password   | success (rejected)          |
 * | mfa@example.com            | password   | requires_mfa                |
 * | reset@example.com          | password   | requires_password_reset     |
 * | verify@example.com         | password   | pending_email_verification  |
 * | locked@example.com         | password   | account_locked              |
 * | (any other credentials)    | (any)      | invalid_credentials         |
 */

export async function mockLoginRequest(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  await delay(MOCK_DELAY_MS);

  const email = credentials.email.trim().toLowerCase();

  switch (email) {
    case 'user@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'success',
        token: 'mock-jwt-token-abc123',
        user: { id: 'usr_001', email: 'user@example.com', name: 'Demo User' },
      };

    case 'onboarding@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'success',
        token: 'mock-jwt-token-onboarding',
        user: { id: 'usr_002', email: 'onboarding@example.com', name: 'Onboarding User' },
      };

    case 'rejected@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'success',
        token: 'mock-jwt-token-rejected',
        user: { id: 'usr_003', email: 'rejected@example.com', name: 'Rejected User' },
      };

    case 'mfa@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'requires_mfa',
        mfaToken: 'mock-mfa-token-xyz789',
        maskedPhone: '***-***-4521',
      };

    case 'reset@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'requires_password_reset',
        resetToken: 'mock-reset-token-def456',
        reason: 'expired',
      };

    case 'verify@example.com':
      if (credentials.password !== 'password') return invalidCredentials();
      return {
        status: 'pending_email_verification',
        email: 'verify@example.com',
        resendAvailableInSeconds: 60,
      };

    case 'locked@example.com':
      return {
        status: 'account_locked',
        lockedUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        supportReference: 'SUP-2026-0042',
      };

    default:
      return invalidCredentials();
  }
}

function invalidCredentials(): LoginResponse {
  return {
    status: 'invalid_credentials',
    message: 'Invalid email or password.',
    attemptsRemaining: 3,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}