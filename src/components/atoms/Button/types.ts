export type ButtonVariant = 'primary' | 'danger' | 'outline';

export type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
};