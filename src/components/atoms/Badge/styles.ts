import type { BadgeStatus } from './types';

export const styles = {
  container: (status: BadgeStatus) => {
    switch (status) {
      case 'completed':
        return 'h-6 w-6 items-center justify-center rounded-full bg-green-100';
      case 'active':
        return 'h-6 w-6 items-center justify-center rounded-full bg-blue-600';
      case 'pending':
        return 'h-6 w-6 items-center justify-center rounded-full bg-slate-100';
    }
  },
  text: (status: BadgeStatus) => {
    switch (status) {
      case 'completed':
        return 'text-xs font-bold text-green-600';
      case 'active':
        return 'text-xs font-bold text-white';
      case 'pending':
        return 'text-xs font-bold text-slate-400';
    }
  },
};