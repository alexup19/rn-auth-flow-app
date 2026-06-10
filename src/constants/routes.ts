export const ROUTES = {
  login: '/' as const,
  loading: '/(auth)/loading' as const,
  dashboard: '/(auth)/dashboard' as const,
  onboarding: '/(auth)/onboarding' as const,
  mfa: '/(flow)/mfa' as const,
  resetPassword: '/(flow)/reset-password' as const,
  verifyEmail: '/(flow)/verify-email' as const,
  accountLocked: '/(flow)/account-locked' as const,
} as const;