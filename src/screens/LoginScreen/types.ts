export type DemoAccount = {
  email: string;
  label: string;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  { email: 'user@example.com', label: 'Success' },
  { email: 'onboarding@example.com', label: 'Onboarding' },
  { email: 'rejected@example.com', label: 'Rejected' },
  { email: 'mfa@example.com', label: 'MFA required' },
  { email: 'reset@example.com', label: 'Password reset' },
  { email: 'verify@example.com', label: 'Email verification' },
  { email: 'locked@example.com', label: 'Account locked' },
] as const;