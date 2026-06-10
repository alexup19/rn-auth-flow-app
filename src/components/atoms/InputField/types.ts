import type { TextInputProps } from 'react-native';

export type InputFieldProps = TextInputProps & {
  label: string;
  error?: string;
};