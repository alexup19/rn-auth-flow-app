import type { BadgeStatus } from 'atoms';

export const styles = {
  container: 'mb-3 flex-row items-center gap-3',
  label: (status: BadgeStatus) => {
    switch (status) {
      case 'completed':
        return 'text-sm text-slate-400 line-through';
      case 'active':
        return 'text-sm font-semibold text-slate-900';
      case 'pending':
        return 'text-sm text-slate-400';
    }
  },
};