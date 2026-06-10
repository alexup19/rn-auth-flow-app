import { mockLoginRequest } from 'api';

describe('mockLoginRequest', () => {
  it('returns success for user@example.com with correct password', async () => {
    const result = await mockLoginRequest({ email: 'user@example.com', password: 'password' });
    expect(result.status).toBe('success');
  });

  it('returns invalid_credentials for user@example.com with wrong password', async () => {
    const result = await mockLoginRequest({ email: 'user@example.com', password: 'wrong' });
    expect(result.status).toBe('invalid_credentials');
  });

  it('returns requires_mfa for mfa@example.com', async () => {
    const result = await mockLoginRequest({ email: 'mfa@example.com', password: 'password' });
    expect(result.status).toBe('requires_mfa');
  });

  it('returns requires_password_reset for reset@example.com', async () => {
    const result = await mockLoginRequest({ email: 'reset@example.com', password: 'password' });
    expect(result.status).toBe('requires_password_reset');
  });

  it('returns pending_email_verification for verify@example.com', async () => {
    const result = await mockLoginRequest({ email: 'verify@example.com', password: 'password' });
    expect(result.status).toBe('pending_email_verification');
  });

  it('returns account_locked for locked@example.com regardless of password', async () => {
    const result = await mockLoginRequest({ email: 'locked@example.com', password: 'wrong' });
    expect(result.status).toBe('account_locked');
  });

  it('returns invalid_credentials for unknown email', async () => {
    const result = await mockLoginRequest({ email: 'unknown@example.com', password: 'password' });
    expect(result.status).toBe('invalid_credentials');
  });

  it('trims and lowercases the email', async () => {
    const result = await mockLoginRequest({ email: '  USER@EXAMPLE.COM  ', password: 'password' });
    expect(result.status).toBe('success');
  });
});