export type AuthSessionStatus =
  | 'success'
  | 'requires_mfa'
  | 'requires_password_reset'
  | 'pending_email_verification'
  | 'account_locked'
  | 'invalid_credentials';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginSuccessPayload = {
  status: 'success';
  token: string;
  user: AuthUser;
};

export type LoginMfaPayload = {
  status: 'requires_mfa';
  mfaToken: string;
  maskedPhone: string;
};

export type LoginPasswordResetPayload = {
  status: 'requires_password_reset';
  resetToken: string;
  reason: 'expired' | 'first_login';
};

export type LoginEmailVerificationPayload = {
  status: 'pending_email_verification';
  email: string;
  resendAvailableInSeconds: number;
};

export type LoginAccountLockedPayload = {
  status: 'account_locked';
  lockedUntil: string;
  supportReference: string;
};

export type LoginInvalidCredentialsPayload = {
  status: 'invalid_credentials';
  message: string;
  attemptsRemaining: number;
};

export type LoginResponse =
  | LoginSuccessPayload
  | LoginMfaPayload
  | LoginPasswordResetPayload
  | LoginEmailVerificationPayload
  | LoginAccountLockedPayload
  | LoginInvalidCredentialsPayload;

export type AuthFlowState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'authenticated'; user: AuthUser; token: string }
  | { phase: 'mfa_required'; mfaToken: string; maskedPhone: string }
  | { phase: 'password_reset_required'; resetToken: string; reason: 'expired' | 'first_login' }
  | { phase: 'email_verification_required'; email: string }
  | { phase: 'account_locked'; lockedUntil: string };
