import { mockCustomerStatusRequest } from 'api';

describe('mockCustomerStatusRequest', () => {
  it('returns onboarded for user@example.com', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_001', 'user@example.com');
    expect(result.status).toBe('onboarded');
  });

  it('returns in_progress for onboarding@example.com', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_002', 'onboarding@example.com');
    expect(result.status).toBe('in_progress');
  });

  it('returns rejected for rejected@example.com', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_003', 'rejected@example.com');
    expect(result.status).toBe('rejected');
  });

  it('returns onboarded for unknown email', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_004', 'unknown@example.com');
    expect(result.status).toBe('onboarded');
  });

  it('throws when token is missing', async () => {
    await expect(
      mockCustomerStatusRequest('', 'usr_001', 'user@example.com')
    ).rejects.toThrow('Unauthorized');
  });

  it('throws when SIMULATE_ERROR is true', async () => {
    // Set SIMULATE_ERROR to true in mockCustomerApi.ts to test this
  });

  it('returns correct currentStep for in_progress status', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_002', 'onboarding@example.com');
    if (result.status === 'in_progress') {
      expect(result.currentStep).toBe(2);
      expect(result.totalSteps).toBe(4);
    }
  });

  it('returns correct reason for rejected status', async () => {
    const result = await mockCustomerStatusRequest('token', 'usr_003', 'rejected@example.com');
    if (result.status === 'rejected') {
      expect(result.reason).toBe('Identity verification failed.');
      expect(result.supportReference).toBe('SUP-2026-0099');
    }
  });
});