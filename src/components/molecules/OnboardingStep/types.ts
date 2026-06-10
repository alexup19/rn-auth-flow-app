import type { BadgeStatus } from 'atoms';

export type OnboardingStepProps = {
  step: number;
  label: string;
  status: BadgeStatus;
};