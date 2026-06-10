export type BadgeStatus = 'completed' | 'active' | 'pending';

export type BadgeProps = {
  status: BadgeStatus;
  step: number;
};