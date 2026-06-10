const MOCK_DELAY_MS = 800;
const SIMULATE_ERROR = false; // set to true to test the retry screen

export type CustomerStatus = 'onboarded' | 'in_progress' | 'rejected';

export type CustomerStatusResponse =
  | { status: 'onboarded'; customerId: string; name: string }
  | { status: 'in_progress'; customerId: string; currentStep: number; totalSteps: number }
  | { status: 'rejected'; customerId: string; reason: string; supportReference: string };

/**
 * | Email                    | Customer Status |
 * |--------------------------|-----------------|
 * | user@example.com         | onboarded       |
 * | onboarding@example.com   | in_progress     |
 * | rejected@example.com     | rejected        |
 *
 * Set SIMULATE_ERROR = true to test the retry screen.
 */
export async function mockCustomerStatusRequest(
  token: string,
  userId: string,
  email: string,
): Promise<CustomerStatusResponse> {
  await delay(MOCK_DELAY_MS);

  if (!token) throw new Error('Unauthorized');
  if (SIMULATE_ERROR) throw new Error('Network error');

  switch (email.trim().toLowerCase()) {
    case 'user@example.com':
      return { status: 'onboarded', customerId: userId, name: 'Demo User' };
    case 'onboarding@example.com':
      return { status: 'in_progress', customerId: userId, currentStep: 2, totalSteps: 4 };
    case 'rejected@example.com':
      return {
        status: 'rejected',
        customerId: userId,
        reason: 'Identity verification failed.',
        supportReference: 'SUP-2026-0099',
      };
    default:
      return { status: 'onboarded', customerId: userId, name: 'Demo User' };
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}