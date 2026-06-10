import type { ButtonVariant } from './types';

export const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-blue-600 active:opacity-90',
    text: 'text-white',
  },
  danger: {
    container: 'border border-slate-200 bg-white active:opacity-80',
    text: 'text-red-500',
  },
  outline: {
    container: 'border border-slate-200 bg-white active:opacity-80',
    text: 'text-slate-900',
  },
};